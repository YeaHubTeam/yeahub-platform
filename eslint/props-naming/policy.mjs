import path from 'node:path';

const COMPONENT_FILE = /^([A-Z][A-Za-z0-9]*)(\.skeleton)?\.tsx$/;
const HOOK_FILE = /^(use[A-Z][A-Za-z0-9]*)\.tsx?$/;
const PROPS_BAG_SUFFIX = /(?:Props|Options|Params)$/;

export function classifyFile(filename) {
	const base = path.basename(filename);

	const componentMatch = base.match(COMPONENT_FILE);
	if (componentMatch) {
		const exportName = `${componentMatch[1]}${componentMatch[2] ? 'Skeleton' : ''}`;

		return {
			kind: 'component',
			exportName,
			propsName: `${exportName}Props`,
		};
	}

	const hookMatch = base.match(HOOK_FILE);
	if (hookMatch) {
		const exportName = hookMatch[1];

		return {
			kind: 'hook',
			exportName,
			propsName: `${exportName[0].toUpperCase()}${exportName.slice(1)}Props`,
		};
	}

	return null;
}

export function isDeclaredPropsType(info) {
	switch (info.form) {
		case 'literal':
		case 'intersection':
		case 'qualified':
			return true;
		case 'reference':
			return PROPS_BAG_SUFFIX.test(info.name);
		case 'union':
			return info.members.some((member) => isDeclaredPropsType(member));
		default:
			return false;
	}
}

export function getPropsIssue(expectedPropsName, props) {
	if (!props || (props.kind === 'name' && props.name === expectedPropsName)) {
		return null;
	}

	if (props.kind === 'name') {
		return 'propsName';
	}

	if (props.kind === 'missing') {
		return 'propsMissing';
	}

	return 'propsAnonymous';
}
