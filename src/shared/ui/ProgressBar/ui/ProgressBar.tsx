import styles from './ProgressBar.module.css';
interface Props {
	daysLeft: number;
	totalDays: number;
}
export const ProgressBar = ({ daysLeft, totalDays }: Props) => {
	const progress = ((totalDays - daysLeft) / totalDays) * 100;

	return (
		<div className={styles['progress-container']}>
			<div className={styles['progress-bar']} style={{ width: `${progress}%` }}>
				<span className={styles['progress-label']}>Осталось {daysLeft} дней</span>
			</div>
		</div>
	);
};
