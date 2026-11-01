import { classifyFile, getPropsIssue, isDeclaredPropsType } from './policy.mjs';

const WRAPPER_TYPES = new Set([
	'Readonly',
	'Partial',
	'Required',
	'Omit',
	'Pick',
	'PropsWithChildren',
]);

const rule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Component and hook file names, export names, and props types must match: QuestionsTableProps, UseCurrentProjectProps',
		},
		schema: [],
		messages: {
			exportName: 'File must export {{kind}} {{expected}}.',
			propsName: 'Props type of {{exportName}} must be named {{expected}}, not {{actual}}.',
			propsAnonymous: 'Props type of {{exportName}} must be a named type {{expected}}.',
			propsMissing: 'Props object of {{exportName}} must be typed as {{expected}}.',
		},
	},
	create(context) {
		const target = classifyFile(context.filename ?? '');
		if (!target) {
			return {};
		}

		const kind = target.kind === 'component' ? 'component' : 'hook';

		return {
			Program(program) {
				const found = findExportedBinding(program, target.exportName);
				if (!found) {
					if (hasBarrelReexport(program, target.exportName)) {
						return;
					}

					context.report({
						node: program,
						messageId: 'exportName',
						data: { kind, expected: target.exportName },
					});
					return;
				}

				const props = resolveProps(found);
				const issue = getPropsIssue(target.propsName, props);
				if (!issue || !props) {
					return;
				}

				context.report({
					node: props.node,
					messageId: issue,
					data: {
						exportName: target.exportName,
						expected: target.propsName,
						actual: props.kind === 'name' ? props.name : '',
					},
				});
			},
		};
	},
};

function findExportedBinding(program, name) {
	const locals = new Map();
	const exported = new Set();

	for (const statement of program.body) {
		if (statement.type === 'FunctionDeclaration' && statement.id) {
			locals.set(statement.id.name, { kind: 'function', node: statement });
		} else if (statement.type === 'ClassDeclaration' && statement.id) {
			locals.set(statement.id.name, { kind: 'class', node: statement });
		} else if (statement.type === 'VariableDeclaration') {
			collectVariables(statement, locals);
		} else if (statement.type === 'ExportNamedDeclaration') {
			const declaration = statement.declaration;
			if (declaration?.type === 'FunctionDeclaration' && declaration.id) {
				locals.set(declaration.id.name, { kind: 'function', node: declaration });
				exported.add(declaration.id.name);
			} else if (declaration?.type === 'ClassDeclaration' && declaration.id) {
				locals.set(declaration.id.name, { kind: 'class', node: declaration });
				exported.add(declaration.id.name);
			} else if (declaration?.type === 'VariableDeclaration') {
				for (const declarator of declaration.declarations) {
					if (declarator.id.type === 'Identifier') {
						locals.set(declarator.id.name, { kind: 'variable', node: declarator });
						exported.add(declarator.id.name);
					}
				}
			}

			if (!statement.source) {
				for (const specifier of statement.specifiers) {
					exported.add(specifier.local.name);
				}
			}
		} else if (statement.type === 'ExportDefaultDeclaration') {
			const declaration = statement.declaration;
			if (declaration.type === 'Identifier') {
				exported.add(declaration.name);
			} else if (declaration.type === 'FunctionDeclaration' && declaration.id) {
				locals.set(declaration.id.name, { kind: 'function', node: declaration });
				exported.add(declaration.id.name);
			} else if (declaration.type === 'ClassDeclaration' && declaration.id) {
				locals.set(declaration.id.name, { kind: 'class', node: declaration });
				exported.add(declaration.id.name);
			}
		}
	}

	if (!exported.has(name)) {
		return null;
	}

	return locals.get(name) ?? null;
}

function collectVariables(statement, locals) {
	for (const declarator of statement.declarations) {
		if (declarator.id.type === 'Identifier') {
			locals.set(declarator.id.name, { kind: 'variable', node: declarator });
		}
	}
}

function hasBarrelReexport(program, name) {
	return program.body.some((statement) => {
		if (statement.type !== 'ExportNamedDeclaration' || !statement.source) {
			return false;
		}

		return statement.specifiers.some((specifier) => {
			const exportedName =
				specifier.exported.type === 'Identifier'
					? specifier.exported.name
					: specifier.exported.value;

			return specifier.local.name === name || exportedName === name;
		});
	});
}

function resolveProps(found) {
	if (found.kind === 'class') {
		return propsFromClass(found.node);
	}

	if (found.kind === 'function') {
		return resolveFunctionProps(found.node, null, null);
	}

	const annotationProps = fcTypeArgument(found.node.id);
	if (!found.node.init) {
		return annotationProps ? describeType(annotationProps) : null;
	}

	const { node, wrapperProps } = unwrapWrappers(found.node.init);
	if (node?.type === 'ClassExpression') {
		return propsFromClass(node);
	}

	if (node?.type === 'ArrowFunctionExpression' || node?.type === 'FunctionExpression') {
		return resolveFunctionProps(node, wrapperProps, annotationProps);
	}

	return null;
}

function unwrapWrappers(init) {
	let node = unwrapExpression(init);
	let wrapperProps = null;

	while (node?.type === 'CallExpression') {
		const name = calleeName(node.callee);
		if (name !== 'memo' && name !== 'forwardRef') {
			break;
		}

		const typeArguments = node.typeArguments?.params ?? [];
		if (name === 'forwardRef' && typeArguments[1]) {
			wrapperProps = typeArguments[1];
		} else if (name === 'memo' && typeArguments[0]) {
			wrapperProps = typeArguments[0];
		}

		const next = node.arguments[0] ? unwrapExpression(node.arguments[0]) : null;
		if (!next) {
			break;
		}

		node = next;
	}

	return { node, wrapperProps };
}

function resolveFunctionProps(fn, wrapperProps, annotationProps) {
	const fromParam = inspectFirstParam(fn);
	if (fromParam && fromParam.kind !== 'missing') {
		return fromParam;
	}

	if (wrapperProps) {
		return describeType(wrapperProps);
	}

	if (annotationProps) {
		return describeType(annotationProps);
	}

	return fromParam;
}

function inspectFirstParam(fn) {
	const param = fn.params[0];
	if (!param || param.type === 'RestElement') {
		return null;
	}

	const pattern = param.type === 'AssignmentPattern' ? param.left : param;
	if (pattern.type === 'RestElement' || pattern.type === 'ArrayPattern') {
		return null;
	}

	const typeNode = unwrapType(
		pattern.typeAnnotation?.typeAnnotation ?? param.typeAnnotation?.typeAnnotation,
	);
	const isObject = pattern.type === 'ObjectPattern';

	if (!typeNode) {
		return isObject ? { kind: 'missing', node: pattern } : null;
	}

	if (!isObject && !isDeclaredPropsType(typeForm(typeNode))) {
		return null;
	}

	return describeType(typeNode);
}

function propsFromClass(classNode) {
	if (!isReactComponentClass(classNode.superClass)) {
		return null;
	}

	const typeArguments =
		classNode.superTypeArguments?.params ?? classNode.superTypeParameters?.params ?? [];
	if (!typeArguments[0]) {
		return null;
	}

	return describeType(typeArguments[0]);
}

function isReactComponentClass(superClass) {
	if (!superClass) {
		return false;
	}

	if (superClass.type === 'Identifier') {
		return superClass.name === 'Component' || superClass.name === 'PureComponent';
	}

	if (
		superClass.type === 'MemberExpression' &&
		!superClass.computed &&
		superClass.property.type === 'Identifier'
	) {
		return superClass.property.name === 'Component' || superClass.property.name === 'PureComponent';
	}

	return false;
}

function fcTypeArgument(id) {
	const typeNode = unwrapType(id?.typeAnnotation?.typeAnnotation);
	if (typeNode?.type !== 'TSTypeReference') {
		return null;
	}

	const name = rightmostName(typeNode.typeName);
	if (name !== 'FC' && name !== 'FunctionComponent') {
		return null;
	}

	return typeNode.typeArguments?.params?.[0] ?? null;
}

function describeType(node) {
	const typeNode = unwrapType(node);
	if (!typeNode) {
		return { kind: 'missing', node };
	}

	if (typeNode.type === 'TSTypeReference' && typeNode.typeName.type === 'Identifier') {
		return { kind: 'name', name: typeNode.typeName.name, node: typeNode };
	}

	return { kind: 'anonymous', node: typeNode };
}

function typeForm(node) {
	const typeNode = unwrapType(node);
	if (!typeNode) {
		return { form: 'other' };
	}

	switch (typeNode.type) {
		case 'TSTypeLiteral':
			return { form: 'literal' };
		case 'TSIntersectionType':
			return { form: 'intersection' };
		case 'TSUnionType':
			return { form: 'union', members: typeNode.types.map((member) => typeForm(member)) };
		case 'TSTypeReference':
			if (typeNode.typeName.type === 'Identifier') {
				return { form: 'reference', name: typeNode.typeName.name };
			}
			return { form: 'qualified' };
		default:
			return { form: 'other' };
	}
}

function unwrapType(node) {
	let current = node;

	for (let depth = 0; current && depth < 5; depth += 1) {
		if (current.type === 'TSParenthesizedType') {
			current = current.typeAnnotation;
			continue;
		}

		if (current.type === 'TSUnionType') {
			const rest = current.types.filter((typeNode) => !isNullish(typeNode));
			if (rest.length === 1) {
				current = rest[0];
				continue;
			}
		}

		if (
			current.type === 'TSTypeReference' &&
			current.typeName.type === 'Identifier' &&
			WRAPPER_TYPES.has(current.typeName.name)
		) {
			const inner = current.typeArguments?.params?.[0];
			if (!inner) {
				break;
			}
			current = inner;
			continue;
		}

		break;
	}

	return current;
}

function unwrapExpression(node) {
	let current = node;

	while (
		current &&
		(current.type === 'TSAsExpression' ||
			current.type === 'TSSatisfiesExpression' ||
			current.type === 'TSTypeAssertion' ||
			current.type === 'ParenthesizedExpression')
	) {
		current = current.expression;
	}

	return current;
}

function calleeName(callee) {
	if (callee.type === 'Identifier') {
		return callee.name;
	}

	if (
		callee.type === 'MemberExpression' &&
		!callee.computed &&
		callee.property.type === 'Identifier'
	) {
		return callee.property.name;
	}

	return null;
}

function rightmostName(typeName) {
	if (!typeName) {
		return null;
	}

	if (typeName.type === 'Identifier') {
		return typeName.name;
	}

	if (typeName.type === 'TSQualifiedName') {
		return typeName.right.name;
	}

	return null;
}

function isNullish(node) {
	return node.type === 'TSNullKeyword' || node.type === 'TSUndefinedKeyword';
}

export default rule;
