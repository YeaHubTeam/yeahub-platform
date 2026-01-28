import classnames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import type { TaskDifficulty } from '../../model/types/task';

import styles from './TaskDifficultyChip.module.css';

type TaskDifficultyChipProps = {
	difficulty: TaskDifficulty;
	className?: string;
};

export const TaskDifficultyChip = ({ difficulty, className }: TaskDifficultyChipProps) => {
	return (
		<Flex
			align="center"
			justify="center"
			className={classnames(styles.chip, styles[`difficulty-${difficulty}`], className)}
		>
			<Text variant="body2-strong" color="white-900">
				{difficulty}
			</Text>
		</Flex>
	);
};
