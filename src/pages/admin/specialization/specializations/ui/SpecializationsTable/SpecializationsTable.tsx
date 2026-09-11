import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Specializations, i18Namespace, ROUTES } from '@/shared/config';
import { formatDate, route, SelectedAdminEntities } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableCellWithTooltip } from '@/shared/ui/TableCellWithTooltip';
import { TableColumn, TableRowId, TableV2 } from '@/shared/ui/TableV2';

import { Specialization } from '@/entities/specialization';

import { useDeleteSpecializationMutation } from '@/features/specialization/deleteSpecialization';

interface SpecializationTableRow {
	id: number;
	title: string;
	description: string;
	createdBy: Author | null;
	createdAt: string;
}

interface SpecializationsTableProps {
	specializations?: Specialization[];
	selectedSpecializations?: SelectedAdminEntities;
	onSelectSpecializations?: (ids: SelectedAdminEntities) => void;
}

export const SpecializationsTable = ({
	specializations,
	selectedSpecializations,
	onSelectSpecializations,
}: SpecializationsTableProps) => {
	const { t } = useTranslation(i18Namespace.specialization);
	const [deleteSpecialization] = useDeleteSpecializationMutation();

	const tableData: SpecializationTableRow[] =
		specializations?.map((specialization) => ({
			id: specialization.id,
			title: specialization.title,
			description: specialization.description,
			createdBy: specialization.createdBy,
			createdAt: specialization.createdAt,
		})) ?? [];

	const columns: TableColumn<SpecializationTableRow>[] = [
		{
			id: 'title',
			header: t(Specializations.TITLE_SHORT),
			width: '25%',
			cell: ({ row, value }) => (
				<TableCellLink
					to={route(ROUTES.admin.specializations.details.page, row.id)}
					text={String(value)}
				/>
			),
		},
		{
			id: 'description',
			header: t(Specializations.DESCRIPTION_SHORT),
			cell: ({ row, value }) => (
				<TableCellWithTooltip title={row.title}>{String(value)}</TableCellWithTooltip>
			),
		},
		{
			id: 'createdBy',
			header: t(Specializations.AUTHOR),
			cell: ({ row }) => row.createdBy?.username || '-',
		},
		{
			id: 'createdAt',
			header: t(Specializations.CREATED_AT),
			cell: ({ row }) => (row.createdAt ? formatDate(new Date(row.createdAt), 'dd.MM.yyyy') : '-'),
		},
	];

	const selectedRowIds = selectedSpecializations?.map((specialization) => specialization.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedSpecializations?.forEach((specialization) =>
			byId.set(specialization.id, specialization),
		);
		specializations?.forEach((specialization) => {
			byId.set(specialization.id, { id: specialization.id, title: specialization.title });
		});

		return byId;
	}, [specializations, selectedSpecializations]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectSpecializations?.(
				ids.map((id) => selectedById.get(id as number) ?? { id: id as number }),
			);
		},
		[onSelectSpecializations, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="specializations"
			onDelete={(id) => deleteSpecialization(Number(id))}
		/>
	);
};
