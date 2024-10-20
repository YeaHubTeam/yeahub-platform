import styles from './Badge.module.css';

interface BadgeProps {
	/* Проп count используется для динамического отображения числового значения в компоненте Badge */
	count: number;
}

export const Badge = ({ count }: BadgeProps) => {
	return <div className={styles.badge}>{count}</div>;
};
