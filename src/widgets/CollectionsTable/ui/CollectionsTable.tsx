import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections, Translation, ROUTES } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';

import { Collection } from '@/entities/collection';

import { useDeleteCollectionMutation } from '@/features/collections/deleteCollection';

import styles from './CollectionsTable.module.css';

interface CollectionsTableRow {
	id: number;
	disabled?: boolean;
	imageSrc: string;
	title: string;
	description: string;
	questionsCount?: number;
	tasksCount?: number;
}

interface CollectionsTableProps {
	collections?: Collection[];
	selectedCollections?: SelectedAdminEntities;
	onSelectCollections?: (ids: SelectedAdminEntities) => void;
}

export const CollectionsTable = ({
	collections,
	selectedCollections,
	onSelectCollections,
}: CollectionsTableProps) => {
	const { t } = useTranslation(i18Namespace.collection);
	const [deleteCollection] = useDeleteCollectionMutation();

	const tableData: CollectionsTableRow[] =
		collections?.map((collection) => ({
			id: collection.id,
			imageSrc: collection.company?.imageSrc || '',
			title: collection.title,
			description: collection.description,
			questionsCount: collection.questionsCount,
			tasksCount: collection.tasksCount,
			disabled: collection.disabled,
		})) ?? [];

	const columns: TableColumn<CollectionsTableRow>[] = [
		{
			id: 'imageSrc',
			header: t(Collections.ICON_TITLE_SHORT),
			width: '100px',
			cell: ({ row }) => (
				<ImageWithWrapper
					src={row.imageSrc}
					alt={`${t(Translation.LOGO)} ${row.title}`}
					className={styles['card-image']}
				/>
			),
		},
		{
			id: 'title',
			header: t(Collections.TITLE_SHORT),
			width: '30%',
			cell: ({ row, value }) => (
				<TableCellLink
					to={route(ROUTES.admin.collections.details.route, row.id)}
					text={String(value)}
				/>
			),
		},
		{
			id: 'description',
			header: t(Collections.DESCRIPTION_SHORT),
			width: 'auto',
		},
		{
			id: 'questionsCount',
			header: t(Collections.QUESTIONS_SHORT),
			width: '90px',
		},
		{
			id: 'tasksCount',
			header: t(Collections.TASKS_SHORT),
			width: '90px',
		},
	];

	const selectedRowIds = selectedCollections?.map((collection) => collection.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedCollections?.forEach((collection) => byId.set(collection.id, collection));
		collections?.forEach((collection) => {
			byId.set(collection.id, { id: collection.id, title: collection.title });
		});

		return byId;
	}, [collections, selectedCollections]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectCollections?.(
				ids.map((id) => selectedById.get(id as number) ?? { id: id as number }),
			);
		},
		[onSelectCollections, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="collections"
			onDelete={(id) => deleteCollection(Number(id))}
		/>
	);
};
