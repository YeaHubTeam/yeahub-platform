import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { AttemptInfoItemProps } from '@/shared/ui/AttemptInfoItem';
import { PieSegmentData } from '@/shared/ui/charts/ui/PieChart/model/PieSegmentData';
import { LegendList } from '@/shared/ui/charts/ui/PieChart/ui/LegentList';
import { PieSegmentList } from '@/shared/ui/charts/ui/PieChart/ui/PieChart/PieSegmentList';
import { Flex } from '@/shared/ui/Flex';

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
	const gapAngle = 10;

	const { radius, circumference, segments, availableAngle } = useMemo(() => {
		const radius = innerContainerSize / 2 - strokeWidth * 2;
		const circumference = 2 * Math.PI * radius;
		const totalValue = attemptData.reduce((sum, item) => sum + item.value, 0);

		const segments: PieSegmentData[] = attemptData.map((item) => {
			const percentage = item.value / totalValue;
			const segmentAngle = 360 * percentage;
			return {
				...item,
				percentage,
				segmentAngle,
				totalValue,
			};
		});

		const totalGapAngle = gapAngle * segments.length;
		const availableAngle = 360 - totalGapAngle;

		return { radius, circumference, segments, totalGapAngle, availableAngle };
	}, [attemptData, innerContainerSize, strokeWidth, gapAngle]);

	return (
		<Flex justify="between" align="center">
			<PieSegmentList
				innerContainerSize={innerContainerSize}
				radius={radius}
				strokeWidth={strokeWidth}
				segments={segments}
				gapAngle={gapAngle}
				availableAngle={availableAngle}
				circumference={circumference}
				STROKE_DEFAULT_COLOR={STROKE_DEFAULT_COLOR}
				CIRCLE_ONE_COLOR={CIRCLE_ONE_COLOR}
				CIRCLE_TWO_COLOR={CIRCLE_TWO_COLOR}
				totalAttempt={totalAttempt}
				t={t}
				Translation={Translation}
			/>
			<LegendList attemptData={segments} DEFAULT_COLOR={DEFAULT_COLOR} />
		</Flex>
	);
};
