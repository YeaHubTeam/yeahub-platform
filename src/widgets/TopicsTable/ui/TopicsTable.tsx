import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, ROUTES, Topics, Translation } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

export interface TopicsTableItem {
	id: number;
	title: string;
	skill: {
		id: number;
		title: string;
	};
	author?: {
		id: string;
		username: string;
	};
	createdAt: string;
}

interface TopicsTableProps {
	topics?: TopicsTableItem[];
	selectedTopics?: SelectedAdminEntities;
	onSelectTopics?: (ids: SelectedAdminEntities) => void;
}

export const TopicsTable = ({ topics, selectedTopics, onSelectTopics }: TopicsTableProps) => {
	const { t } = useTranslation([i18Namespace.topic, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: '35%',
			skill: '25%',
			author: '25%',
			createdAt: '140px',
		};
		return Object.values(columnWidths).map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Topics.TITLE_SHORT),
			skill: t(Topics.SKILL_TITLE),
			author: t(Translation.AUTHOR, { ns: i18Namespace.translation }),
			createdAt: t(Topics.CREATED_AT),
		};
		return Object.entries(columns).map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (topic: TopicsTableItem) => {
		const columns = {
			title: <Text variant="body3-accent">{topic.title}</Text>,
			skill: (
				<Link to={route(ROUTES.admin.skills.details.page, topic.skill.id)}>
					<Text variant="body3-accent">{topic.skill.title}</Text>
				</Link>
			),
			author: topic.author ? (
				<Link to={route(ROUTES.admin.users.detail.page, topic.author.id)}>
					<Text variant="body3-accent">{topic.author.username}</Text>
				</Link>
			) : (
				<Text variant="body3-accent">-</Text>
			),
			createdAt: (
				<Text variant="body3-accent">
					{topic.createdAt ? format(new Date(topic.createdAt), 'dd.MM.yyyy') : '-'}
				</Text>
			),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	if (!topics) return null;

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={topics}
			selectedItems={selectedTopics}
			onSelectItems={onSelectTopics}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};
