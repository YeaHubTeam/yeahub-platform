import { useTranslation } from 'react-i18next';

import { i18Namespace, Task } from '@/shared/config';
import { type SelectedAdminEntities } from '@/shared/libs';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import type { TaskListItem } from '@/entities/task';

interface TasksTableProps {
	tasks: TaskListItem[];
	selectedTasks?: SelectedAdminEntities<string>;
	onSelectTasks?: (ids: SelectedAdminEntities<string>) => void;
}

export const TasksTable = (props: TasksTableProps) => {
	const { tasks, selectedTasks, onSelectTasks } = props;
	const { t } = useTranslation([i18Namespace.task, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: 'auto',
			difficulty: '15%',
			status: '15%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Task.TABLE_TASK_TITLE),
			difficulty: t(Task.TABLE_DIFFICULTY_TITLE),
			status: t(Task.TABLE_STATUS_TITLE),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (task: TaskListItem) => {
		const columns = {
			title: task.name,
			difficulty: task.difficulty,
			status: task.status,
		};

		return Object.entries(columns)?.map(([k, v]) => {
			return <td key={k}>{k === 'title' ? <Text variant="body3-accent">{v}</Text> : v}</td>;
		});
	};

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={tasks}
			selectedItems={selectedTasks}
			onSelectItems={onSelectTasks}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};
