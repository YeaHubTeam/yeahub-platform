import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Tasks } from '@/shared/config';

import { useGetTaskByIdQuery } from '@/entities/task';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { TaskPageContent } from '../TaskPageContent/TaskPageContent';

const TaskPage = () => {
	const { t } = useTranslation(i18Namespace.task);
	const { taskId = '' } = useParams<{ taskId: string }>();
	const {
		data: task,
		isLoading,
		isError,
		refetch,
	} = useGetTaskByIdQuery(taskId, {
		skip: !taskId,
	});

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Tasks.STUB_EMPTY_TASK_TITLE),
			subtitle: t(Tasks.STUB_EMPTY_TASK_SUBTITLE),
			buttonText: t(Tasks.STUB_EMPTY_TASK_SUBMIT),
			onClick: () => refetch(),
		},
		error: {
			onClick: () => refetch(),
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={task && Object.keys(task).length > 0}
			stubs={stubs}
			content={task && <TaskPageContent task={task} />}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TaskPage;
