import classNames from 'classnames';

import { Card } from '@/shared/ui/Card';

import styles from './ProgressBlock.module.css';

interface ProgressBlockProps {
	checksCount?: number;
}

export const ProgressBlock = ({ checksCount }: ProgressBlockProps) => {
	// create bars - hardcoded length by 3?
	const bars = Array.from({ length: 3 }, (_, i) => i + 1);

	const classNamesRow = (bar: number) =>
		classNames(styles['progress-bar-item'], {
			// large to current question?
			[styles['progress-bar-item-large']]: bar === checksCount,
			[styles['progress-bar-item-checked']]: bar <= (checksCount ?? 0),
		});

	return (
		<Card className={styles.wrapper}>
			<h3 className={styles.title}>Прогресс</h3>
			<div>
				<p className={styles.info}>Пройдено {checksCount ?? 0} из 3 вопрос изучен!</p>
				<div className={styles['progress-bar-wrapper']}>
					{bars.map((bar) => (
						<span key={bar} className={classNamesRow(bar)}></span>
					))}
				</div>
			</div>
		</Card>
	);
};
