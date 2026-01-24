import { useTranslation } from 'react-i18next';

import { i18Namespace, Task as TaskTranslations } from '@/shared/config';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import type { Task } from '../../model/types/task';

import styles from './TaskDescription.module.css';

type TaskDescriptionProps = {
	task: Task;
};

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
	const { t } = useTranslation(i18Namespace.task);
	return (
		<div className={styles.wrapper}>
			<Text variant="head4">{task.name}</Text>
			<TextHtml html={task.description} className={styles.description} />

			{task.constraints?.length > 0 && (
				<div className={styles.constraints}>
					<Text variant="head4" className={styles['constraints-title']}>
						{t(TaskTranslations.DESCRIPTION_CONSTRAINTS_TITLE)}
					</Text>

					<ul className={styles['constraints-list']}>
						{task.constraints.map((constraint, index) => (
							<li key={`${constraint}-${index}`} className={styles['constraint-item']}>
								<Text variant="body2">{constraint}</Text>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
