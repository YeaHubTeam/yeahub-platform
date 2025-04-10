import { useRangeContext } from '../useRangeContext';
import styles from './RangeUnits.module.css';

export const RangeUnits = () => {
	const { hasScale, minValueIcon, maxValueIcon, min, max } = useRangeContext();

	return (
		!hasScale &&
		minValueIcon &&
		maxValueIcon && (
			<div className={styles['units']}>
				<span>{min}</span>
				<span>{max}</span>
			</div>
		)
	);
};
