import React from 'react';

import { PieSegmentData } from '@/shared/ui/charts/ui/PieChart/model/PieSegmentData'; // Импортируйте новый компонент
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from '../../PieChart.module.css';

import { PieSegmentItem } from './PieSegmentItem';

interface PieSegmentListProps {
	innerContainerSize: number;
	radius: number;
	strokeWidth: number;
	segments: PieSegmentData[];
	gapAngle: number;
	availableAngle: number;
	circumference: number;
	STROKE_DEFAULT_COLOR: string;
	CIRCLE_ONE_COLOR: string;
	CIRCLE_TWO_COLOR: string;
	totalAttempt: number;
	t: (key: string) => string;
	Translation: { [key: string]: string };
}

const calculateArcLength = (adjustedSegmentAngle: number, circumference: number): number => {
	return (adjustedSegmentAngle / 360) * circumference;
};

const calculateStrokeDasharray = (arcLength: number, circumference: number): string => {
	return `${arcLength} ${circumference - arcLength}`;
};

const calculateStrokeDashoffset = (startPosition: number, circumference: number): number => {
	return circumference * 0.25 - startPosition;
};

export const PieSegmentList = ({
	innerContainerSize,
	radius,
	strokeWidth,
	segments,
	gapAngle,
	availableAngle,
	circumference,
	STROKE_DEFAULT_COLOR,
	CIRCLE_ONE_COLOR,
	CIRCLE_TWO_COLOR,
	totalAttempt,
	t,
	Translation,
}: PieSegmentListProps) => {
	return (
		<Flex direction="column" align="center" justify="center">
			<div className={styles['inner-circle-container']}>
				<svg
					className={styles['pie-chart-svg']}
					width={innerContainerSize}
					height={innerContainerSize}
					viewBox={`0 0 ${innerContainerSize} ${innerContainerSize}`}
				>
					<circle
						r={radius}
						fill={CIRCLE_ONE_COLOR}
						cx={innerContainerSize / 2}
						cy={innerContainerSize / 2}
						className={styles['pie-chart-segment']}
					/>
					<circle
						r={radius * 0.8}
						fill={CIRCLE_TWO_COLOR}
						cx={innerContainerSize / 2}
						cy={innerContainerSize / 2}
						className={styles['pie-chart-segment']}
					/>
					{segments.map((item, index) => {
						const adjustedSegmentAngle = item.percentage * availableAngle;

						const arcLength = calculateArcLength(adjustedSegmentAngle, circumference);
						const gapLength = (gapAngle / 360) * circumference;

						const strokeDasharrayValue = calculateStrokeDasharray(arcLength, circumference);

						const startPosition = segments.slice(0, index).reduce((acc, segment) => {
							const prevAdjustedAngle = segment.percentage * availableAngle;
							const prevArcLength = calculateArcLength(prevAdjustedAngle, circumference);
							return acc + prevArcLength + gapLength;
						}, 0);

						const strokeDashoffsetValue = calculateStrokeDashoffset(startPosition, circumference);

						return (
							<PieSegmentItem
								key={index}
								cx={innerContainerSize / 2}
								cy={innerContainerSize / 2}
								r={radius * 1.1}
								stroke={item.itemStyle?.color || STROKE_DEFAULT_COLOR}
								strokeWidth={strokeWidth}
								strokeDasharray={strokeDasharrayValue.toString()}
								strokeDashoffset={strokeDashoffsetValue.toString()}
								fill="none"
							/>
						);
					})}
				</svg>
				<Text className={styles['pie-chart-label']} color="black-700" variant="body4">
					{t(Translation.TOTAL_QUESTIONS)}
					<br />
					{totalAttempt}
				</Text>
			</div>
		</Flex>
	);
};
