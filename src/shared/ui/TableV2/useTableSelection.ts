import { useCallback, useMemo } from 'react';

import type { TableRowId } from './types';

interface UseTableSelectionParams<T> {
	data: T[];
	getRowId: (row: T) => TableRowId;
	selectedRowIds?: readonly TableRowId[];
	onSelectedRowIdsChange?: (ids: TableRowId[]) => void;
	isRowSelectionDisabled?: (row: T) => boolean;
}

const defaultIsRowSelectionDisabled = <T>(row: T): boolean => {
	return Boolean((row as { disabled?: boolean }).disabled);
};

export const useTableSelection = <T>({
	data,
	getRowId,
	selectedRowIds,
	onSelectedRowIdsChange,
	isRowSelectionDisabled,
}: UseTableSelectionParams<T>) => {
	const isRowDisabled = isRowSelectionDisabled ?? defaultIsRowSelectionDisabled;
	const selectionEnabled = selectedRowIds !== undefined && onSelectedRowIdsChange !== undefined;

	const selectedIds = useMemo(() => new Set(selectedRowIds ?? []), [selectedRowIds]);

	const selectableIds = useMemo(
		() => data.filter((row) => !isRowDisabled(row)).map(getRowId),
		[data, getRowId, isRowDisabled],
	);

	const selectedOnPageCount = selectableIds.filter((id) => selectedIds.has(id)).length;
	const allRowsSelected = selectableIds.length > 0 && selectedOnPageCount === selectableIds.length;
	const selectionIntermediate =
		selectedOnPageCount > 0 && selectedOnPageCount < selectableIds.length;
	const selectionDisabled = selectableIds.length === 0;

	const toggleAllRows = useCallback(() => {
		if (!onSelectedRowIdsChange) return;

		const pageIds = new Set(selectableIds);

		if (allRowsSelected) {
			onSelectedRowIdsChange(Array.from(selectedIds).filter((id) => !pageIds.has(id)));
			return;
		}

		const nextIds = new Set(selectedIds);
		selectableIds.forEach((id) => nextIds.add(id));
		onSelectedRowIdsChange(Array.from(nextIds));
	}, [allRowsSelected, onSelectedRowIdsChange, selectableIds, selectedIds]);

	const toggleRow = useCallback(
		(row: T) => {
			if (!onSelectedRowIdsChange || isRowDisabled(row)) return;

			const rowId = getRowId(row);
			const nextIds = new Set(selectedIds);

			if (nextIds.has(rowId)) {
				nextIds.delete(rowId);
			} else {
				nextIds.add(rowId);
			}

			onSelectedRowIdsChange(Array.from(nextIds));
		},
		[getRowId, isRowDisabled, onSelectedRowIdsChange, selectedIds],
	);

	return {
		selectionEnabled,
		selectedIds,
		allRowsSelected,
		selectionIntermediate,
		selectionDisabled,
		isRowDisabled,
		toggleAllRows,
		toggleRow,
	};
};
