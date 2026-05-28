import { TaskCreateFormSkeleton } from '@/features/task/createTask';

import { PageWrapper } from '@/widgets/PageWrapper';

export const TaskCreatePageSkeleton = () => {
	const content = <TaskCreateFormSkeleton />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};
