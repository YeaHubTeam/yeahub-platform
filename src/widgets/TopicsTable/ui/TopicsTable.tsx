import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, Topics, Translation } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { type TableColumn, type TableRowId, TableV2 } from '@/shared/ui/TableV2';

import { TopicsTableItem } from '../lib/mapTopicsToTableItems';

interface TopicsTableProps {
	topics?: TopicsTableItem[];
	selectedTopics?: SelectedAdminEntities;
	onSelectTopics?: (ids: SelectedAdminEntities) => void;
}

export const TopicsTable = ({ topics, selectedTopics, onSelectTopics }: TopicsTableProps) => {
	const { t } = useTranslation([i18Namespace.topic, i18Namespace.translation]);

	const columns: Array<TableColumn<TopicsTableItem>> = [
		{
			id: 'title',
			header: t(Topics.TITLE_SHORT),
			width: '35%',
		},
		{
			id: 'skill',
			header: t(Topics.SKILL_TITLE),
			width: '25%',
			cell: ({ row }) => (
				<TableCellLink
					to={route(ROUTES.admin.skills.details.page, row.skill.id)}
					text={row.skill.title}
				/>
			),
		},
		{
			id: 'author',
			header: t(Translation.AUTHOR, { ns: i18Namespace.translation }),
			width: '25%',
			cell: ({ row }) =>
				row.author ? (
					<TableCellLink
						to={route(ROUTES.admin.users.detail.page, row.author.id)}
						text={row.author.username}
					/>
				) : (
					'-'
				),
		},
		{
			id: 'createdAt',
			header: t(Topics.CREATED_AT),
			width: '140px',
		},
	];

	const selectedRowIds = selectedTopics?.map((topic) => topic.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedTopics?.forEach((topic) => {
			byId.set(topic.id, topic);
		});

		topics?.forEach((topic) => {
			byId.set(topic.id, { id: topic.id, title: topic.title });
		});

		return byId;
	}, [topics, selectedTopics]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectTopics?.(ids.map((id) => selectedById.get(id as number) ?? { id: id as number }));
		},
		[onSelectTopics, selectedById],
	);

	if (!topics) return null;

	return (
		<TableV2
			data={topics}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['copy']}
			entity="topics"
		/>
	);
};
