import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Task } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import type { TaskDifficulty } from '@/entities/task';
import { TaskDifficultyChip } from '@/entities/task';

import styles from './TaskDifficultyFilter.module.css';

interface TaskDifficultyFilterProps {
	selectedDifficulty?: TaskDifficulty;
	onChangeDifficulty: (difficulty?: TaskDifficulty) => void;
}

const DIFFICULTY_OPTIONS: Array<{ id: TaskDifficulty; title: string }> = [
	{ id: 1, title: '1' },
	{ id: 2, title: '2' },
	{ id: 3, title: '3' },
	{ id: 4, title: '4' },
	{ id: 5, title: '5' },
];

export const TaskDifficultyFilter = ({
	selectedDifficulty,
	onChangeDifficulty,
}: TaskDifficultyFilterProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const preparedData = DIFFICULTY_OPTIONS.map((item) => ({
		id: item.id,
		title: item.title,
		active: selectedDifficulty === item.id,
	}));

	const onToggleDifficulty = (id: TaskDifficulty) => {
		onChangeDifficulty(selectedDifficulty === id ? undefined : id);
	};

	return (
		<BaseFilterSection
			title={t(Task.DIFFICULTY_TITLE_SHORT)}
			data={preparedData}
			onClick={onToggleDifficulty}
			renderItem={({ item, onClick, disabled, active }) => (
				<button
					type="button"
					onClick={onClick}
					disabled={disabled}
					aria-pressed={active}
					className={classnames(styles.item, styles[`item-${item.id}`], {
						[styles.active]: active,
					})}
				>
					<TaskDifficultyChip difficulty={item.id} />
				</button>
			)}
		/>
	);
};
