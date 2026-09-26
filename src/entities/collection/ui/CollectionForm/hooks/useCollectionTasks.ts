import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetCollectionTasksQuery } from '../../../api/collectionApi';

export const useCollectionTasks = (
	collectionId?: string,
	tasksCount?: number,
	isEdit?: boolean,
) => {
	const { setValue, watch } = useFormContext();
	const [selectedTasks, setSelectedTasks] = useState<{ title: string; id: string }[]>([]);

	const watchCollectionTasks = watch('taskIds', []);

	const { data: collectionTasks } = useGetCollectionTasksQuery(
		{
			collectionId: collectionId!,
			limit: tasksCount,
		},
		{ skip: !isEdit || collectionId === undefined },
	);

	useEffect(() => {
		if (collectionTasks) {
			setValue(
				'taskIds',
				collectionTasks.data.map((task) => String(task.id)),
			);
			setSelectedTasks(
				collectionTasks.data.map((task) => ({
					id: String(task.id),
					title: task.name,
				})),
			);
		}
	}, [collectionTasks, setValue]);

	const handleSelectTask = (task: { title: string; id: string }) => {
		setSelectedTasks((prev) => [...prev, task]);
		setValue('taskIds', [...watchCollectionTasks, task.id]);
	};

	const handleUnselectTask = (id: string) => {
		setSelectedTasks((prev) => prev.filter((item) => item.id !== id));
		setValue(
			'taskIds',
			watchCollectionTasks.filter((taskId: string) => taskId !== id),
		);
	};

	return { selectedTasks, handleSelectTask, handleUnselectTask };
};
