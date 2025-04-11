import React from 'react';

import { PieSegment } from '../types';
import { calculateArcLength, calculateStrokeDasharray, calculateStrokeDashoffset } from '../utils';

import styles from './PieSegmentItem.module.css';

interface PieSegmentItemProps {
	cx: number;
	cy: number;
	r: number;
	stroke?: string;
	strokeWidth: number;
	segment: PieSegment;
	circumference: number;
	availableAngle: number;
	startPosition: number;
}

const STROKE_DEFAULT_COLOR = '#F98BA6';

export const PieSegmentItem = ({
	cx,
	cy,
	r,
	stroke = STROKE_DEFAULT_COLOR,
	strokeWidth,
	segment,
	circumference,
	availableAngle,
	startPosition,
}: PieSegmentItemProps) => {
	const adjustedSegmentAngle = segment.percentage * availableAngle;

	const arcLength = calculateArcLength(adjustedSegmentAngle, circumference);

	const strokeDasharrayValue = calculateStrokeDasharray(arcLength, circumference);

	const strokeDashoffsetValue = calculateStrokeDashoffset(startPosition, circumference);

	return (
		<circle
			className={styles['pie-chart-segment']}
			cx={cx}
			cy={cy}
			r={r}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeDasharray={strokeDasharrayValue.toString()}
			strokeDashoffset={strokeDashoffsetValue.toString()}
			fill="none"
		/>
	);
};
