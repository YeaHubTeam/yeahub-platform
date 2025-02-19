import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { AttemptInfoItemProps } from '@/shared/ui/AttemptInfoItem';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './PieChart.module.css';

interface PieChartProps {
	totalAttempt: number;
	attemptData: AttemptInfoItemProps[];
}

const STROKE_DEFAULT_COLOR = '#F98BA6';
const CIRCLE_ONE_COLOR = '#F8F8F8';
const CIRCLE_TWO_COLOR = '#FDF4FF';
const DEFAULT_COLOR = '#8C8C8C';

export const PieChart = ({ totalAttempt, attemptData }: PieChartProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const innerContainerSize = 307;
	const strokeWidth = 10;
	const radius = innerContainerSize / 2 - strokeWidth * 2;
	const gapAngle = 15;
	const totalValue = attemptData.reduce((sum, item) => sum + item.value, 0);

	const circumference = 2 * Math.PI * radius;

	const segments = attemptData.map((item) => {
		const percentage = item.value / totalValue;
		const segmentAngle = 360 * percentage;
		return {
			...item,
			percentage,
			segmentAngle,
		};
	});

	const totalGapAngle = gapAngle * segments.length;

	const availableAngle = 360 - totalGapAngle;
	const getCircleBaseOptions = () => ({
		cx: innerContainerSize / 2,
		cy: innerContainerSize / 2,
		className: styles['pie-chart-segment'],
	});

	return (
		<Flex className={styles['pie-chart-wrapper']}>
			<Flex direction="column" align="center" justify="center">
				<div className={styles['inner-circle-container']}>
					<svg
						className={styles['pie-chart-svg']}
						width={innerContainerSize}
						height={innerContainerSize}
						viewBox={`0 0 ${innerContainerSize} ${innerContainerSize}`}
					>
						<circle r={radius} fill={CIRCLE_ONE_COLOR} {...getCircleBaseOptions()} />
						<circle r={radius * 0.8} fill={CIRCLE_TWO_COLOR} {...getCircleBaseOptions()} />
						{segments.map((item, index) => {
							const adjustedSegmentAngle = item.percentage * availableAngle;

							const arcLength = (adjustedSegmentAngle / 360) * circumference;
							const gapLength = (gapAngle / 360) * circumference;

							const strokeDasharrayValue = `${arcLength} ${circumference - arcLength}`;

							const startPosition = segments.slice(0, index).reduce((acc, segment) => {
								const prevAdjustedAngle = segment.percentage * availableAngle;
								const prevArcLength = (prevAdjustedAngle / 360) * circumference;
								return acc + prevArcLength + gapLength;
							}, 0);

							const strokeDashoffsetValue = circumference * 0.25 - startPosition;

							return (
								<circle
									key={index}
									className={styles['pie-chart-segment']}
									cx={innerContainerSize / 2}
									cy={innerContainerSize / 2}
									r={radius * 1.1}
									stroke={item.itemStyle?.color || STROKE_DEFAULT_COLOR}
									strokeWidth={strokeWidth}
									strokeDasharray={strokeDasharrayValue}
									strokeDashoffset={strokeDashoffsetValue}
									fill="none"
								/>
							);
						})}
					</svg>
					<Text className={styles['pie-chart-label']} variant="body2">
						{t(Translation.TOTAL_QUESTIONS)}
						<br />
						{totalAttempt}
					</Text>
				</div>
			</Flex>

			<Flex className={styles['pie-chart-legend']} direction="column">
				{attemptData.map((item, index) => (
					<Flex key={index} className={styles['legend-item']} align="center">
						<div
							className={styles['legend-color']}
							style={{ backgroundColor: item.itemStyle?.color || DEFAULT_COLOR }}
						></div>
						<Text variant="body3">
							<Text className={styles['legend-name']} variant="body3">
								{item.name}
							</Text>
							<Text className={styles['legend-percent']} variant="body2-accent">
								{((item.value / totalValue) * 100).toFixed(0)}%
							</Text>
						</Text>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};
