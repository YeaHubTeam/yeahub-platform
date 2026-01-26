import classnames from 'classnames';

import { DifficultyBadge } from '@/shared/ui/DifficultyBadge';

import type { TaskDifficulty } from '../../model/types/task';

import styles from './TaskDifficultyChip.module.css';

type TaskDifficultyChipProps = {
	difficulty: TaskDifficulty;
	className?: string;
};

export const TaskDifficultyChip = ({ difficulty, className }: TaskDifficultyChipProps) => {
	return (
		<DifficultyBadge className={classnames(styles[`difficulty-${difficulty}`], className)}>
			{difficulty}
		</DifficultyBadge>
	);
};
