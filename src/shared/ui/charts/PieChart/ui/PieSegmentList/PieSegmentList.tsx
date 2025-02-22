import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { PieSegment } from '../../model/types/types';
import { calculateArcLength } from '../../model/utils/utils';
import { PieSegmentItem } from '../PieSegmentItem/PieSegmentItem';

import styles from './PieSegmentList.module.css';

interface PieSegmentListProps {
	segments: PieSegment[];
	totalAttempt: number;
}

export const PieSegmentList = ({ segments, totalAttempt }: PieSegmentListProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const strokeWidth = 10;
	const gapAngle = 10;
	const innerContainerSize = 307;
	const radius = innerContainerSize / 2 - strokeWidth * 2;
	const circumference = 2 * Math.PI * radius;
	const totalGapAngle = gapAngle * segments.length;
	const availableAngle = 360 - totalGapAngle;

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
						fill="#F8F8F8"
						cx={innerContainerSize / 2}
						cy={innerContainerSize / 2}
						className={styles['pie-chart-segment']}
					/>
					<circle
						r={radius * 0.8}
						fill="#FDF4FF"
						cx={innerContainerSize / 2}
						cy={innerContainerSize / 2}
						className={styles['pie-chart-segment']}
					/>
					{segments.map((segment, index) => {
						const gapLength = (gapAngle / 360) * circumference;
						const startPosition = segments.slice(0, index).reduce((acc, segment) => {
							const prevAdjustedAngle = segment.percentage * availableAngle;
							const prevArcLength = calculateArcLength(prevAdjustedAngle, circumference);
							return acc + prevArcLength + gapLength;
						}, 0);

						return (
							<PieSegmentItem
								startPosition={startPosition}
								key={index}
								cx={innerContainerSize / 2}
								cy={innerContainerSize / 2}
								r={radius * 1.1}
								segment={segment}
								stroke={segment.itemStyle?.color}
								strokeWidth={strokeWidth}
								circumference={circumference}
								availableAngle={availableAngle}
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
