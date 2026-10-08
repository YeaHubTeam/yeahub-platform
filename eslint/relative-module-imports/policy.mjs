const SLICED_LAYERS = new Set(['processes', 'pages', 'widgets', 'features', 'entities']);
const SEGMENTS = new Set(['ui', 'model', 'lib', 'libs', 'api', 'config', 'assets']);

/**
 * A module is an FSD slice: pages/tasks/task, entities/question, shared/ui/Button.
 * A component inside that slice is imported with a relative path, not via @/.
 */
export function evaluateImport(filename, source) {
	if (!source.startsWith('@/')) {
		return null;
	}

	const fileParts = toSrcParts(filename);
	const importParts = source.slice(2).split('/').filter(Boolean);
	if (!fileParts || importParts.length === 0) {
		return null;
	}

	const fileModule = getModuleRoot(fileParts);
	const importModule = getModuleRoot(importParts);
	if (!fileModule || fileModule !== importModule) {
		return null;
	}

	if (!isComponentImport(importParts, fileModule)) {
		return null;
	}

	return { source };
}

function toSrcParts(filename) {
	const normalized = filename.replace(/\\/g, '/');
	const marker = '/src/';
	const markerIndex = normalized.lastIndexOf(marker);
	if (markerIndex !== -1) {
		return normalized
			.slice(markerIndex + marker.length)
			.split('/')
			.filter(Boolean);
	}

	if (normalized.startsWith('src/')) {
		return normalized.slice(4).split('/').filter(Boolean);
	}

	return null;
}

function getModuleRoot(parts) {
	const layer = parts[0];
	if (SLICED_LAYERS.has(layer)) {
		const segmentIndex = parts.findIndex((part, index) => index > 0 && isSegment(part));
		if (segmentIndex > 1) {
			return parts.slice(0, segmentIndex).join('/');
		}

		const last = parts[parts.length - 1];
		const isFile = last.includes('.');
		if (isFile && /^index\./.test(last) && parts.length >= 3) {
			return parts.slice(0, -1).join('/');
		}

		if (!isFile && parts.length >= 2) {
			return parts.join('/');
		}

		return null;
	}

	if (layer === 'shared') {
		const segmentIndex = parts.findIndex((part, index) => index > 0 && isSegment(part));
		if (segmentIndex < 1 || parts.length <= segmentIndex + 1) {
			return null;
		}

		const sliceFolder = parts[segmentIndex + 1];
		if (sliceFolder.includes('.')) {
			return null;
		}

		return parts.slice(0, segmentIndex + 2).join('/');
	}

	return null;
}

function isComponentImport(importParts, moduleRoot) {
	const inside = importParts.slice(moduleRoot.split('/').length);
	if (inside.length === 0) {
		return true;
	}

	if (inside[0].split('.')[0] === 'ui') {
		return true;
	}

	const last = inside[inside.length - 1].replace(/\.(tsx|ts|jsx|js)$/, '');
	const base = last.split('.')[0];

	return /^[A-Z][A-Za-z0-9]*$/.test(base);
}

function isSegment(part) {
	return SEGMENTS.has(part.split('.')[0]);
}
