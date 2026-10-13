import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, Tasks } from '@/shared/config';
import { route, type SelectedAdminEntities } from '@/shared/libs';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableV2, type TableColumn, type TableRowId } from '@/shared/ui/TableV2';

import { Task, taskCategories } from '@/entities/task';

import { useDeleteTaskMutation } from '@/features/task/deleteTask';

interface TaskTableRow {
	id: string;
	title: string;
	categories: Task['categories'];
	difficulty: Task['difficulty'];
	supportedLanguages: Task['supportedLanguages'];
	companies: Task['companies'];
}

interface TasksTableProps {
	tasks: Task[];
	selectedTasks?: SelectedAdminEntities<string>;
	onSelectTasks?: (ids: SelectedAdminEntities<string>) => void;
}

export const TasksTable = ({ tasks, selectedTasks, onSelectTasks }: TasksTableProps) => {
	const { t } = useTranslation(i18Namespace.task);
	const [deleteTask] = useDeleteTaskMutation();

	const tableData: TaskTableRow[] = tasks.map((task) => ({
		id: task.id,
		title: task.name,
		categories: task.categories,
		difficulty: task.difficulty,
		supportedLanguages: task.supportedLanguages,
		companies: task.companies,
	}));

	const columns: TableColumn<TaskTableRow>[] = [
		{
			id: 'title',
			header: t(Tasks.TABLE_TASK),
			width: 'auto',
			cell: ({ row, value }) => (
				<TableCellLink to={route(ROUTES.admin.tasks.details.route, row.id)} text={String(value)} />
			),
		},
		{
			id: 'categories',
			header: t(Tasks.CATEGORY_TITLE),
			width: '20%',
			cell: ({ value }) =>
				(value as Task['categories']).map((category) => t(taskCategories[category])).join(', '),
		},
		{
			id: 'difficulty',
			header: t(Tasks.TABLE_DIFFICULTY),
			width: '10%',
		},
		{
			id: 'supportedLanguages',
			header: t(Tasks.LANGUAGES_TITLE),
			width: '20%',
			cell: ({ row }) => row.supportedLanguages.map((language) => language.name).join(', '),
		},
		{
			id: 'companies',
			header: t(Tasks.COMPANIES_TITLE),
			width: '20%',
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={row.companies}
					showCount={3}
				/>
			),
		},
	];

	const selectedRowIds = selectedTasks?.map((task) => task.id);

	const selectedById = useMemo(() => {
		const byId = new Map<string, { id: string; title?: string }>();

		selectedTasks?.forEach((task) => byId.set(task.id, task));
		tasks.forEach((task) => byId.set(task.id, { id: task.id, title: task.name }));

		return byId;
	}, [selectedTasks, tasks]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectTasks?.(ids.map((id) => selectedById.get(String(id)) ?? { id: String(id) }));
		},
		[onSelectTasks, selectedById],
	);

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="tasks"
			onDelete={(id) => deleteTask(String(id))}
		/>
	);
};
