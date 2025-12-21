import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace, Topics, Translation, ROUTES } from '@/shared/config';
import { SelectedAdminEntities, formatDate, route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Topic } from '@/entities/topic';

import { DeleteTopicButton } from '@/features/topics/deleteTopic';

import styles from './TopicsTable.module.css';

interface TopicsTableProps {
	topics?: Topic[];
	selectedTopics?: SelectedAdminEntities;
	onSelectTopics?: (ids: SelectedAdminEntities) => void;
	onDeleteSuccess?: () => void;
}

export const TopicsTable = ({
	topics,
	selectedTopics,
	onSelectTopics,
	onDeleteSuccess,
}: TopicsTableProps) => {
	const { t } = useTranslation([i18Namespace.topic, i18Namespace.translation]);
	const navigate = useNavigate();

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
			createdAt: topic.createdAt ? formatDate(new Date(topic.createdAt), 'dd.MM.yyyy') : '',
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

	const renderActions = (topic: Topic) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.topics.details.page, topic.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				tooltip: {
					color: 'red',
					text: t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO, { ns: i18Namespace.translation }),
				},
				disabled: topic.disabled,
				onClick: () => {
					navigate(route(ROUTES.admin.topics.details.page, topic.id));
				},
			},
			{
				renderComponent: () => (
					<DeleteTopicButton
						topicId={topic.id}
						disabled={topic.disabled}
						onSuccess={onDeleteSuccess}
					/>
				),
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="actions"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!topics) {
		return null;
	}

	return (
		<Table
			items={topics}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			renderTableColumnWidths={renderTableColumnWidth}
			selectedItems={selectedTopics}
			onSelectItems={onSelectTopics}
			hasCopyButton
		/>
	);
};
