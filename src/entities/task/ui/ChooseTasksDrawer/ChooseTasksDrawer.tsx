import { useTranslation } from 'react-i18next';

import PlusSvg from '@/shared/assets/icons/plus1.svg';
import { i18Namespace, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Chip } from '@/shared/ui/Chip';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ChooseTasksDrawer.module.css';
import { TasksSearchList } from './TasksSearchList';

interface TaskData {
	id: string;
	title: string;
}

interface ChooseTasksDrawerProps {
	selectedTasks: TaskData[];
	handleSelectTask: (task: TaskData) => void;
	handleUnselectTask: (id: string) => void;
}

export const ChooseTasksDrawer = ({
	selectedTasks,
	handleSelectTask,
	handleUnselectTask,
}: ChooseTasksDrawerProps) => {
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);
	const { isOpen, onToggle, onClose } = useModal();

	return (
		<>
			<Flex className={selectedTasks.length !== 0 ? styles.column : styles.row}>
				<Flex gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text variant="body4"> {t('tasks.short', { ns: i18Namespace.collection })} </Text>
						<Text variant="body2">{t('tasks.label', { ns: i18Namespace.collection })}</Text>
					</Flex>
					<Flex direction="column" gap="24" className={styles['selected-questions']}>
						<Text variant="body3-accent">
							{' '}
							{t('tasks.selected', {
								count: selectedTasks.length,
								ns: i18Namespace.collection,
							})}
						</Text>
						<Flex direction="column" gap="16">
							{selectedTasks.map((task) => (
								<Chip
									key={task.id}
									className={styles['chip']}
									theme="primary"
									label={task.title}
									onDelete={() => handleUnselectTask(task.id)}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
				<Button onClick={onToggle} className={styles['add-button']}>
					{t(Translation.CREATE)}
					<PlusSvg className={styles['plus-svg']} />
				</Button>
			</Flex>
			<Drawer isOpen={isOpen} onClose={onClose} rootName="body" className={styles['drawer']}>
				<TasksSearchList
					selectedTasks={selectedTasks}
					onSelectTask={(task) => handleSelectTask({ ...task, id: String(task.id) })}
				/>
			</Drawer>
		</>
	);
};
