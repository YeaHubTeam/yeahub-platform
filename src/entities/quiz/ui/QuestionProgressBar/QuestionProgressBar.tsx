import styles from './QuestionProgressBar.module.css';

interface QuestionProgressBarProps {
	currentCount: number;
	totalCount: number;
	className?: string;
}

export const QuestionProgressBar = ({
	className = '',
	currentCount,
	totalCount,
}: QuestionProgressBarProps) => {
	return (
		<div className={className}>
			<progress className={styles['progress-bar']} value={currentCount} max={totalCount}></progress>
		</div>
	);
};
