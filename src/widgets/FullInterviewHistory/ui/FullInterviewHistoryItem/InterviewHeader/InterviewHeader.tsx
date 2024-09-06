import { Icon } from 'yeahub-ui-kit';

import styles from './InterviewHeader.module.css';

interface InterviewHeaderProps {
	title: string;
}

export const InterviewHeader = ({ title }: InterviewHeaderProps) => {
	return (
		<div className={styles.header}>
			<h3>{title}</h3>
			<div className={styles.link}>
				<span>Подробнее</span>
				<Icon icon="caretRight" size={20} color="--palette-ui-purple-700" className={styles.icon} />
			</div>
		</div>
	);
};
