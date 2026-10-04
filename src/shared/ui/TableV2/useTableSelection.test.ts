import { renderHook } from '@testing-library/react';

import { TableRowId } from './types';
import { useTableSelection } from './useTableSelection';

interface TestRow {
	id: number;
	title: string;
	disabled?: boolean;
}

interface ControlledHookProps {
	selectedRowIds: readonly TableRowId[];
}

const rows: TestRow[] = [
	{ id: 1, title: 'First' },
	{ id: 2, title: 'Second' },
	{ id: 3, title: 'Disabled', disabled: true },
];

const getRowId = (row: TestRow): TableRowId => row.id;

describe('useTableSelection', () => {
	describe('configuration and derived state', () => {
		it('disables selection when controlled props are omitted', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
				}),
			);

			expect(result.current.selectionEnabled).toBe(false);
			expect(result.current.selectionDisabled).toBe(false);
		});

		it('keeps selection disabled when only selectedRowIds is provided', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [],
				}),
			);

			expect(result.current.selectionEnabled).toBe(false);
		});

		it('keeps selection disabled when only the change callback is provided', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					onSelectedRowIdsChange: jest.fn(),
				}),
			);

			expect(result.current.selectionEnabled).toBe(false);
		});

		it.each([
			{
				name: 'none',
				selectedRowIds: [],
				allRowsSelected: false,
				selectionIntermediate: false,
			},
			{
				name: 'a part',
				selectedRowIds: [1],
				allRowsSelected: false,
				selectionIntermediate: true,
			},
			{
				name: 'all',
				selectedRowIds: [1, 2],
				allRowsSelected: true,
				selectionIntermediate: false,
			},
		])(
			'calculates checkbox state when $name of the selectable rows are selected',
			({ selectedRowIds, allRowsSelected, selectionIntermediate }) => {
				const { result } = renderHook(() =>
					useTableSelection({
						data: rows,
						getRowId,
						selectedRowIds,
						onSelectedRowIdsChange: jest.fn(),
					}),
				);

				expect(result.current.allRowsSelected).toBe(allRowsSelected);
				expect(result.current.selectionIntermediate).toBe(selectionIntermediate);
				expect(result.current.selectionDisabled).toBe(false);
			},
		);

		it.each([
			{ name: 'the page is empty', data: [] },
			{ name: 'all rows are disabled', data: [rows[2]] },
		])('disables the header checkbox when $name', ({ data }) => {
			const { result } = renderHook(() =>
				useTableSelection({
					data,
					getRowId,
					selectedRowIds: [],
					onSelectedRowIdsChange: jest.fn(),
				}),
			);

			expect(result.current.selectionDisabled).toBe(true);
			expect(result.current.allRowsSelected).toBe(false);
			expect(result.current.selectionIntermediate).toBe(false);
		});

		it('uses the disabled field by default', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [],
					onSelectedRowIdsChange: jest.fn(),
				}),
			);

			expect(result.current.isRowDisabled(rows[0])).toBe(false);
			expect(result.current.isRowDisabled(rows[2])).toBe(true);
		});

		it('uses a custom disabled predicate instead of the disabled field', () => {
			const isRowSelectionDisabled = (row: TestRow) => row.id === 2;

			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [1, 3],
					onSelectedRowIdsChange: jest.fn(),
					isRowSelectionDisabled,
				}),
			);

			expect(result.current.isRowDisabled(rows[1])).toBe(true);
			expect(result.current.isRowDisabled(rows[2])).toBe(false);
			expect(result.current.allRowsSelected).toBe(true);
		});

		it('normalizes duplicate selected IDs through Set', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [1, 1, 2],
					onSelectedRowIdsChange: jest.fn(),
				}),
			);

			expect(result.current.selectedIds).toEqual(new Set([1, 2]));
		});
	});

	describe('toggleRow', () => {
		it('adds an unselected row and preserves the existing order', () => {
			const onSelectedRowIdsChange = jest.fn();
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [1, 99],
					onSelectedRowIdsChange,
				}),
			);

			result.current.toggleRow(rows[1]);

			expect(onSelectedRowIdsChange).toHaveBeenCalledTimes(1);
			expect(onSelectedRowIdsChange).toHaveBeenCalledWith([1, 99, 2]);
		});

		it('removes an already selected row and preserves other-page IDs', () => {
			const onSelectedRowIdsChange = jest.fn();
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [1, 99],
					onSelectedRowIdsChange,
				}),
			);

			result.current.toggleRow(rows[0]);

			expect(onSelectedRowIdsChange).toHaveBeenCalledWith([99]);
		});

		it('ignores a disabled row', () => {
			const onSelectedRowIdsChange = jest.fn();
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [],
					onSelectedRowIdsChange,
				}),
			);

			result.current.toggleRow(rows[2]);

			expect(onSelectedRowIdsChange).not.toHaveBeenCalled();
		});

		it('does nothing when the change callback is omitted', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [],
				}),
			);

			expect(() => result.current.toggleRow(rows[0])).not.toThrow();
		});
	});

	describe('toggleAllRows', () => {
		it('selects every selectable page row and preserves unrelated IDs', () => {
			const onSelectedRowIdsChange = jest.fn();
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [1, 3, 99],
					onSelectedRowIdsChange,
				}),
			);

			result.current.toggleAllRows();

			expect(onSelectedRowIdsChange).toHaveBeenCalledWith([1, 3, 99, 2]);
		});

		it('deselects only selectable page rows and preserves unrelated IDs', () => {
			const onSelectedRowIdsChange = jest.fn();
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [1, 2, 3, 99],
					onSelectedRowIdsChange,
				}),
			);

			expect(result.current.allRowsSelected).toBe(true);

			result.current.toggleAllRows();

			expect(onSelectedRowIdsChange).toHaveBeenCalledWith([3, 99]);
		});

		it('does nothing when the change callback is omitted', () => {
			const { result } = renderHook(() =>
				useTableSelection({
					data: rows,
					getRowId,
					selectedRowIds: [],
				}),
			);

			expect(() => result.current.toggleAllRows()).not.toThrow();
		});
	});

	describe('controlled updates', () => {
		it('recalculates state after the parent provides new selected IDs', () => {
			const onSelectedRowIdsChange = jest.fn();
			const { result, rerender } = renderHook(
				({ selectedRowIds }: ControlledHookProps) =>
					useTableSelection({
						data: rows,
						getRowId,
						selectedRowIds,
						onSelectedRowIdsChange,
					}),
				{
					initialProps: { selectedRowIds: [1] },
				},
			);

			expect(result.current.selectionIntermediate).toBe(true);
			expect(result.current.allRowsSelected).toBe(false);

			rerender({ selectedRowIds: [1, 2] });

			expect(result.current.selectionIntermediate).toBe(false);
			expect(result.current.allRowsSelected).toBe(true);
			expect(result.current.selectedIds).toEqual(new Set([1, 2]));
		});
	});
});
