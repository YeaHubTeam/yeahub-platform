import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, Tasks, Translation } from '@/shared/config';
import { route, type SelectedAdminEntities } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Task, taskCategories } from '@/entities/task';

import { DeleteTaskButton } from '@/features/task/deleteTask';

interface TasksTableProps {
	tasks: Task[];
	selectedTasks?: SelectedAdminEntities<string>;
	onSelectTasks?: (ids: SelectedAdminEntities<string>) => void;
}

export const TasksTable = ({ tasks, selectedTasks, onSelectTasks }: TasksTableProps) => {
	const navigate = useNavigate();

	const { t } = useTranslation([i18Namespace.task, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: 'auto',
			category: '20%',
			difficulty: '10%',
			languages: '20%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Tasks.TABLE_TASK),
			category: t(Tasks.CATEGORY_TITLE),
			difficulty: t(Tasks.TABLE_DIFFICULTY),
			languages: t(Tasks.LANGUAGES_TITLE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (task: Task) => {
		const columns = {
			title: (
				<Link to={route(ROUTES.admin.tasks.details.route, task.id)}>
					<Text variant="body3-accent">{task.name}</Text>
				</Link>
			),
			category: t(taskCategories[task.mainCategory]),
			difficulty: task.difficulty,
			languages: task.supportedLanguages.map((language) => language.name).join(', '),
		};

		return Object.entries(columns)?.map(([k, v]) => {
			return <td key={k}>{v}</td>;
		});
	};

	const renderActions = (task: Task) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.tasks.details.route, task.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.tasks.edit.route, task.id));
				},
				tooltip: {
					color: 'red',
					text: t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO, { ns: i18Namespace.translation }),
				},
			},
			{
				renderComponent: () => <DeleteTaskButton taskId={task.id} />,
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
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

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={tasks}
			selectedItems={selectedTasks}
			onSelectItems={onSelectTasks}
			renderTableColumnWidths={renderTableColumnWidths}
			renderActions={renderActions}
			hasCopyButton
		/>
	);
};
