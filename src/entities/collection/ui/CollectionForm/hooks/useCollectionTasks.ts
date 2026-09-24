import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useLazyGetTaskByIdQuery } from '@/entities/task/@x/collection';

import { useGetCollectionTasksQuery } from '../../../api/collectionApi';

export const useCollectionTasks = (
	collectionId?: string,
	tasksCount?: number,
	isEdit?: boolean,
) => {
	const { setValue, watch } = useFormContext();
	const [selectedTasks, setSelectedTasks] = useState<{ title: string; id: string }[]>([]);

	const watchCollectionTasks = watch('taskIds', []);
	const [getTaskById] = useLazyGetTaskByIdQuery();
	const taskIdsKey = watchCollectionTasks.join(',');

	const { data: collectionTasks } = useGetCollectionTasksQuery(
		{
			collectionId: collectionId!,
			limit: tasksCount,
		},
		{ skip: !isEdit || collectionId === undefined },
	);

	useEffect(() => {
		const taskIds = taskIdsKey ? taskIdsKey.split(',') : [];

		if (collectionId || taskIds.length === 0) {
			return;
		}

		let isActive = true;

		const restoreSelectedTasks = async () => {
			const restoredTasks = await Promise.all(
				taskIds.map(async (taskId: string) => {
					try {
						const task = await getTaskById(taskId, true).unwrap();

						return { id: String(task.id), title: task.name };
					} catch {
						return null;
					}
				}),
			);

			if (isActive) {
				setSelectedTasks(
					restoredTasks.filter((task): task is { id: string; title: string } => task !== null),
				);
			}
		};

		void restoreSelectedTasks();

		return () => {
			isActive = false;
		};
	}, [collectionId, getTaskById, taskIdsKey]);

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
