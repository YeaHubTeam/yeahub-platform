import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';

import { useGetTaskByIdQuery } from '@/entities/task';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { TaskPageContent } from '../TaskPageContent/TaskPageContent';

const TaskPage = () => {
	const { t } = useTranslation(i18Namespace.task);
	const { taskId = '' } = useParams<{ taskId: string }>();
	const { data: task, refetch, isLoading, isError } = useGetTaskByIdQuery(taskId);

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		empty: {
			title: t(Tasks.STUB_EMPTY_TASK_TITLE),
			subtitle: t(Tasks.STUB_EMPTY_TASK_SUBTITLE),
			buttonText: t(Tasks.STUB_EMPTY_TASK_SUBMIT),
			onClick: refetch,
		},
	};

	const hasTask = !!task && Object.keys(task).length > 0;

	return (
		<PageWrapper
			stubs={stubs}
			isLoading={isLoading}
			hasError={isError}
			hasData={hasTask}
			roles={['admin', 'author']}
			content={task ? <TaskPageContent task={task} /> : null}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TaskPage;
