import { TaskCreateForm } from '@/features/task/createTask';

import { PageWrapper } from '@/widgets/PageWrapper';

const TaskCreatePage = () => {
	const content = <TaskCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TaskCreatePage;
