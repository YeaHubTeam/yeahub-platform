import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, Topics, Translation, ROUTES } from '@/shared/config';
import { SelectedAdminEntities, formatDate } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Topic } from '@/entities/topic';

import styles from './TopicsTable.module.css';

interface TopicsTableProps {
	topics?: Topic[];
	selectedTopics?: SelectedAdminEntities;
	onSelectTopics?: (ids: SelectedAdminEntities) => void;
}

export const TopicsTable = ({ topics, selectedTopics, onSelectTopics }: TopicsTableProps) => {
	const { t } = useTranslation([i18Namespace.topics, i18Namespace.translation]);

	const renderTableColumnWidth = () => {
		const columnWidths = {
			title: '20%',
			description: 'auto',
			skill: '22%',
			createdAt: '12%',
		};

		return Object.entries(columnWidths).map(([k, w]) => <col key={k} style={{ width: w }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Topics.TITLE_SHORT),
			description: t(Topics.DESCRIPTION_SHORT),
			skill: t(Topics.SKILLS_SHORT),
			createdAt: t(Topics.CREATED_AT),
		};

		return Object.entries(columns).map(([k, v]) => (
			<td key={k} className={styles.cell}>
				<Text variant="body2-accent" color="white-900">
					{v}
				</Text>
			</td>
		));
	};

	const renderTableBody = (topic: Topic) => {
		const columns = {
			title: topic.title,
			description: topic.description,
			skill: (
				<Flex gap="8" align="center">
					<ImageWithWrapper
						src={topic.skill.imageSrc}
						alt={`${t(Translation.LOGO)} ${topic.skill.title}`}
						className={styles['skill-image']}
					/>
					<Text variant="body3-accent" color="purple-700">
						{topic.skill.title}
					</Text>
				</Flex>
			),
			createdAt: formatDate(new Date(topic.createdAt), 'dd.MM.yyyy'),
		};

		return Object.entries(columns).map(([k, v]) => (
			<td key={k} className={styles.cell}>
				{k === 'title' ? (
					<Link to={ROUTES.admin.topics.page}>
						<Text variant="body2-accent">{v}</Text>
					</Link>
				) : (
					<Text variant="body2-accent">{v}</Text>
				)}
			</td>
		));
	};

	if (!topics) {
		return null;
	}

	return (
		<Table
			items={topics}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderTableColumnWidths={renderTableColumnWidth}
			selectedItems={selectedTopics}
			onSelectItems={onSelectTopics}
		/>
	);
};
