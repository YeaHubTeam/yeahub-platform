import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Stub } from '@/shared/ui/Stub';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { getProfileId } from '@/entities/profile/@x/task';

import { useGetTasksProfileSolutionsQuery } from '../../api/taskApi';
import { TaskSolution } from '../../model/types/task';
import { TaskSolutionInfo } from '../TaskSolutionInfo/TaskSolutionInfo';

export const TaskSolutions = () => {
	const { taskId = '' } = useParams<Partial<{ taskId?: string }>>();
	const { t } = useTranslation(i18Namespace.task);
	const profileId = useAppSelector(getProfileId);
	const [selectedSolution, setSelectedSolution] = useState<TaskSolution | null>(null);

	const { data: solutions } = useGetTasksProfileSolutionsQuery({ profileId, taskId });

	if (!solutions || solutions.length === 0) {
		return (
			<Stub
				type="empty"
				title={t(Tasks.SOLUTIONS_TAB_TITLE)}
				subtitle={t(Tasks.SOLUTIONS_TAB_SUBTITLE)}
			/>
		);
	}

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: 'auto',
			description: 'auto',
			type: '15%',
			specialization: '20%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			status: t(Tasks.TABLE_STATUS),
			language: t(Tasks.TABLE_LANGUAGE),
			time: t(Tasks.TABLE_TIME),
			memory: t(Tasks.TABLE_MEMORY),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (solution: TaskSolution) => {
		const columns = {
			status: (
				<Text variant="body3-accent" color={solution.status === 'solved' ? 'green-800' : 'red-700'}>
					{t(
						solution.status === 'solved'
							? Tasks.TABLE_STATUS_SOLVED
							: Tasks.TABLE_STATUS_NOT_SOLVED,
					)}
				</Text>
			),
			language: solution.solutionLanguage.name,
			time: t(Tasks.TIME_LIMIT_VALUE, { count: solution.bestExecutionTime || 0 }),
			memory: t(Tasks.MEMORY_LIMIT_VALUE, { count: solution.bestMemoryUsage || 0 }),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const onRowClick = (solution: TaskSolution) => {
		setSelectedSolution(solution);
	};

	return selectedSolution ? (
		<TaskSolutionInfo solution={selectedSolution} setSelectedSolution={setSelectedSolution} />
	) : (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			items={solutions}
			renderTableColumnWidths={renderTableColumnWidths}
			onRowClick={onRowClick}
		/>
	);
};
