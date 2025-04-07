import cn from 'classnames';
import { forwardRef } from 'react';

import { useRangeContext } from '../useRangeContext';
import styles from './RangeLabel.module.css';

export const RangeLabel = forwardRef<HTMLDivElement>((_, ref) => {
	const { sliderWidth, thumbWidth, isDraggable, hasScale, value } = useRangeContext();

	return (
		<div
			style={{
				width: sliderWidth - thumbWidth,
				marginLeft: thumbWidth / 2,
				position: 'absolute',
			}}
		>
			<div
				ref={ref}
				className={cn(styles['label'], {
					[styles['label-active']]: isDraggable,
				})}
				style={{ display: hasScale ? 'none' : 'block' }}
			>
				{value}
			</div>
		</div>
	);
});

RangeLabel.displayName = 'RangeLabel';
