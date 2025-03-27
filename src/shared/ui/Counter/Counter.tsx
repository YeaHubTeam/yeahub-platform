import { Icon } from 'yeahub-ui-kit';

import styles from './Counter.module.css';

interface CounterProps {
	count: number;
	onChange: (count: number) => void;
	maxCount?: number;
}

export const Counter = ({ count, onChange, maxCount }: CounterProps) => {
	const handleIncreaseCount = () => {
		if (!maxCount || count < maxCount) {
			const newValue = count + 1;
			onChange(newValue);
		}
	};

	const handleDecreaseCount = () => {
		const newValue = count === 1 ? 1 : count - 1;
		onChange(newValue);
	};

	return (
		<div className={styles.wrapper}>
			<Icon icon="minus" onClick={handleDecreaseCount} className={styles.icon} />
			<div className={styles.count}>{count}</div>
			<Icon icon="plus" onClick={handleIncreaseCount} className={styles.icon} />
		</div>
	);
};
