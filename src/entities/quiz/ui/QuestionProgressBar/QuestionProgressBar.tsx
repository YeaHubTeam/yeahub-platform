import styles from './QuestionProgressBar.module.css';

interface QuestionProgressBarProps {
	className?: string;
}

export const QuestionProgressBar = ({ className = '' }: QuestionProgressBarProps) => {
	return (
		<div className={className}>
			<progress className={styles['progress-bar']} value="20" max="100"></progress>
		</div>
	);
};
