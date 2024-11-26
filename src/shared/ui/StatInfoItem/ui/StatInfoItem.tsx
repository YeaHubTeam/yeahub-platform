import classNames from 'classnames';

import styles from './StatInfoItem.module.css';

interface StatInfoItemProps {
	title: string;
	value: string;
	className?: string;
}

export const StatInfoItem = ({ title, value, className = '' }: StatInfoItemProps) => {
	return (
		<div className={classNames(styles.stat, className)}>
			<h4 className={styles.title}>{title}</h4>
			<span className={styles.value}>{value}</span>
		</div>
	);
};
