import { evaluateImport } from './policy.mjs';

const rule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Import components from the same module with a relative path, not via the @/ alias',
		},
		schema: [],
		messages: {
			sameModule: 'Import a component from the same module with a relative path, not "{{source}}".',
		},
	},
	create(context) {
		const filename = context.filename ?? '';

		function check(sourceNode) {
			if (!sourceNode || sourceNode.type !== 'Literal' || typeof sourceNode.value !== 'string') {
				return;
			}

			const issue = evaluateImport(filename, sourceNode.value);
			if (!issue) {
				return;
			}

			context.report({
				node: sourceNode,
				messageId: 'sameModule',
				data: { source: issue.source },
			});
		}

		return {
			ImportDeclaration(node) {
				check(node.source);
			},
			ExportNamedDeclaration(node) {
				check(node.source);
			},
			ExportAllDeclaration(node) {
				check(node.source);
			},
			ImportExpression(node) {
				check(node.source);
			},
		};
	},
};

export default rule;
