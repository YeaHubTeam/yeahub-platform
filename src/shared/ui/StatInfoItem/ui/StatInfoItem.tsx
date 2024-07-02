import styles from './StatInfoItem.module.css';

interface Props {
	title: string;
	value: string;
}

export const StatInfoItem = ({ title, value }: Props) => {
	return (
		<div className={styles.stat}>
			<h4 className={styles.title}>{title}</h4>
			<span>{value}</span>
		</div>
	);
};
