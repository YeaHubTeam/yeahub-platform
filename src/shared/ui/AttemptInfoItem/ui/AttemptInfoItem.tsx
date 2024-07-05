import styles from './AttemptInfoItem.module.css';

export interface AttemptData {
	value: number;
	name: string;
	itemStyle?: {
		color?: string;
	};
}

export const AttemptInfoItem = ({ value, name, itemStyle }: AttemptData) => {
	return (
		<li className={styles.item}>
			<div
				className={styles.divide}
				style={{ backgroundColor: itemStyle?.color ? itemStyle.color : 'none' }}
			></div>
			<div className={styles.info}>
				<span className={styles.title}>{name}</span>
				<span className={styles.value}>{value}%</span>
			</div>
		</li>
	);
};
