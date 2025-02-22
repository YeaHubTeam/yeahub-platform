import React from 'react';

import styles from '../../PieChart.module.css';

interface PieSegmentItemProps {
	cx: number;
	cy: number;
	r: number;
	stroke: string;
	strokeWidth: number;
	strokeDasharray: string;
	strokeDashoffset: string;
	fill: string;
}

export const PieSegmentItem = ({
	cx,
	cy,
	r,
	stroke,
	strokeWidth,
	strokeDasharray,
	strokeDashoffset,
	fill,
}: PieSegmentItemProps) => {
	return (
		<circle
			className={styles['pie-chart-segment']}
			cx={cx}
			cy={cy}
			r={r}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeDasharray={strokeDasharray}
			strokeDashoffset={strokeDashoffset}
			fill={fill}
		/>
	);
};
