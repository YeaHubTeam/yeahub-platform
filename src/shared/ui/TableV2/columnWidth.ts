import type { CSSProperties } from 'react';

const FLEXIBLE_WIDTH = /^(auto|fit-content|min-content|max-content)$/i;
const SELECTION_COLUMN_WIDTH = '32px';

const isFlexibleColumnWidth = (width?: string): boolean => {
	if (!width) {
		return true;
	}

	return FLEXIBLE_WIDTH.test(width.trim());
};

export const getColumnWidthStyle = (width?: string): CSSProperties | undefined => {
	if (!width || isFlexibleColumnWidth(width)) {
		return undefined;
	}

	const value = width.trim();

	if (value.endsWith('%')) {
		return { width: value };
	}

	return { width: value, minWidth: value, maxWidth: value };
};

export const getCellWidthStyle = (width?: string): CSSProperties | undefined => {
	if (!width || isFlexibleColumnWidth(width) || width.trim().endsWith('%')) {
		return undefined;
	}

	const value = width.trim();

	return { width: value, minWidth: value, maxWidth: value };
};

export const getTableMinWidth = (
	widths: Array<string | undefined>,
	selectionEnabled: boolean,
): string | undefined => {
	const parts = [
		...(selectionEnabled ? [SELECTION_COLUMN_WIDTH] : []),
		...widths.flatMap((width) => {
			if (!width || isFlexibleColumnWidth(width)) {
				return [];
			}

			return [width.trim()];
		}),
	];

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(' + ')})`;
};
