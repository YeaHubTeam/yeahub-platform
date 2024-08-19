import { FC } from 'react';

import ArrowDown from '@/shared/assets/icons/arrowDown.svg';
import ArrowUp from '@/shared/assets/icons/arrowUp.svg';

import styles from './InterviewResults.module.css';

interface Props {
	label: string;
	correctAnswersCount: number;
	incorrectAnswersCount: number;
}

export const InterviewResults: FC<Props> = ({
	label,
	correctAnswersCount,
	incorrectAnswersCount,
}) => {
	return (
		<div className={styles.param}>
			<span>{label}</span>
			<div className={styles.wrapper}>
				<div className={styles.result}>
					<ArrowUp className={styles.icon} />
					<span className={styles.count}>{correctAnswersCount}</span>
				</div>
				<div className={styles.result}>
					<ArrowDown className={styles.icon} />
					<span className={styles.count}>{incorrectAnswersCount}</span>
				</div>
			</div>
		</div>
	);
};
