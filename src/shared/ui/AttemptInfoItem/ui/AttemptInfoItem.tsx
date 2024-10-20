import styles from './AttemptInfoItem.module.css';

export interface AttemptInfoItemProps {
	value: number;
	name: string;
	itemStyle?: {
		color?: string;
	};
}

export const AttemptInfoItem = ({ value, name, itemStyle }: AttemptInfoItemProps) => {
	return (
		<li className={styles.item}>
			<div className={styles.divide} style={{ backgroundColor: itemStyle?.color || 'none' }}></div>
			<div className={styles.info}>
				<span className={styles.title}>{name}</span>
				<span className={styles.value}>{Math.trunc(value)}%</span>
			</div>
		</li>
	);
};
