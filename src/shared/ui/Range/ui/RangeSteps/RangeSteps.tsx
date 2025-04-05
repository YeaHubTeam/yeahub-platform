import cn from 'classnames';

import { useRangeContext } from '../../lib/context/useRangeContext';

import styles from './RangeSteps.module.css';

export const RangeSteps = () => {
	const { step, sliderWidth, thumbWidth, min, max, maxValueIcon, minValueIcon } = useRangeContext();

	if (!step) return null;
	const steps: JSX.Element[] = [];
	const stepWidth = ((sliderWidth - thumbWidth) / (max - min)) * step;

	for (let i = min; i <= max; i += step) {
		steps.push(
			<div key={i} className={styles['step']}>
				<span>{i}</span>
				<div className={styles['dot']}></div>
			</div>,
		);
	}

	return (
		<div
			className={cn(styles['steps'], {
				[styles['steps-scale']]: maxValueIcon || minValueIcon,
			})}
			style={{
				width: sliderWidth - thumbWidth,
				gap: stepWidth,
				display: 'grid',
				gridTemplateColumns: `repeat(${max / step + 1},0px)`,
			}}
		>
			{steps.map((Step) => Step)}
		</div>
	);
};
