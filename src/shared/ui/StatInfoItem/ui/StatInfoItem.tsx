import styles from './StatInfoItem.module.css';

interface StatInfoItemProps {
	title: string;
	value: string;
}

export const StatInfoItem = ({ title, value }: StatInfoItemProps) => {
	return (
		<div className={styles.stat}>
			<h4 className={styles.title}>{title}</h4>
			<span>{value}</span>
		</div>
	);
};
