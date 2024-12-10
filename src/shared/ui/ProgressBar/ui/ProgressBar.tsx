import styles from './ProgressBar.module.css';

interface ProgressBarProps {
	progress: number;
	progressLabel?: string;
}

export const ProgressBar = ({ progress, progressLabel }: ProgressBarProps) => {
	return (
		<div className={styles['progress-container']}>
			<div className={styles['progress-bar']} style={{ width: `${progress}%` }}>
				{progressLabel && <span className={styles['progress-label']}>{progressLabel}</span>}
			</div>
		</div>
	);
};
