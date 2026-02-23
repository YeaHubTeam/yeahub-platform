import { useParams } from 'react-router-dom';

import { useGetTaskByIdQuery } from '@/entities/task';

import { TaskEditForm } from '@/features/task/editTask';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const TaskEditPage = () => {
	const { taskId = '' } = useParams<{ taskId: string }>();

	const { data: task, isLoading, isError, refetch } = useGetTaskByIdQuery(taskId);

	const hasTask = task && Object.keys(task).length > 0;

	const content = hasTask ? <TaskEditForm task={task} /> : null;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasTask}
			stubs={stubs}
			content={content}
			roles={['admin', 'author']}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TaskEditPage;
