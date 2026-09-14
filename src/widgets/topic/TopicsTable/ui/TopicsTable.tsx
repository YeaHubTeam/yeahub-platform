import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, Topics, Translation, ROUTES } from '@/shared/config';
import { SelectedAdminEntities, formatDate, route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';
import { Text } from '@/shared/ui/Text';

import { Topic } from '@/entities/topic';

import { useDeleteTopicMutation } from '@/features/topics/deleteTopic';

import styles from './TopicsTable.module.css';

interface TopicTableRow {
	id: number;
	title: string;
	description: string;
	skill: Topic['skill'];
	createdAt: string;
	disabled?: boolean;
}

interface TopicsTableProps {
	topics?: Topic[];
	selectedTopics?: SelectedAdminEntities;
	onSelectTopics?: (ids: SelectedAdminEntities) => void;
}

export const TopicsTable = ({ topics, selectedTopics, onSelectTopics }: TopicsTableProps) => {
	const { t } = useTranslation([i18Namespace.topic, i18Namespace.translation]);
	const [deleteTopic] = useDeleteTopicMutation();

	const tableData: TopicTableRow[] =
		topics?.map((topic) => ({
			id: topic.id,
			title: topic.title,
			description: topic.description,
			skill: topic.skill,
			createdAt: topic.createdAt ? formatDate(new Date(topic.createdAt), 'dd.MM.yyyy') : '',
			disabled: topic.disabled,
		})) ?? [];

	const columns: Array<TableColumn<TopicTableRow>> = [
		{
			id: 'title',
			header: t(Topics.TITLE_SHORT),
			width: '20%',
			cell: ({ row, value }) => (
				<Link to={route(ROUTES.admin.topics.details.page, row.id)}>
					<Text variant="body2-accent">{String(value)}</Text>
				</Link>
			),
		},
		{
			id: 'description',
			header: t(Topics.DESCRIPTION_SHORT),
			width: 'auto',
			cell: ({ value }) => <Text variant="body2-accent">{String(value)}</Text>,
		},
		{
			id: 'skill',
			header: t(Topics.SKILLS_SHORT),
			width: '22%',
			cell: ({ row }) => (
				<Flex gap="8" align="center">
					<ImageWithWrapper
						src={row.skill.imageSrc}
						alt={`${t(Translation.LOGO)} ${row.skill.title}`}
						className={styles['skill-image']}
					/>
					<Text variant="body3-accent" color="purple-700">
						{row.skill.title}
					</Text>
				</Flex>
			),
		},
		{
			id: 'createdAt',
			header: t(Topics.CREATED_AT),
			width: '12%',
			cell: ({ value }) => <Text variant="body2-accent">{String(value)}</Text>,
		},
	];

	const selectedRowIds = selectedTopics?.map((topic) => topic.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedTopics?.forEach((topic) => byId.set(topic.id, topic));

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

	if (!topics) {
		return null;
	}

	return (
		<TableV2
			data={tableData}
			columns={columns}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="topics"
			onDelete={(id) => deleteTopic(Number(id))}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
		/>
	);
};
