import React from 'react';

import { Flex } from '@/shared/ui/Flex';
import { AttemptInfo } from '@/shared/ui/PercentsInfoPie/model/types/types';

import { PieSegment } from '../../model/types/types';
import { LegendList } from '../LegendList/LegendList';
import { PieSegmentList } from '../PieSegmentList/PieSegmentList';

interface PieChartProps {
	totalAttempt: number;
	pieData: AttemptInfo[];
}

export const PieChart = ({ totalAttempt, pieData }: PieChartProps) => {
	const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

	const segments: PieSegment[] = pieData.map((item) => {
		const percentage = item.value / totalValue;
		const segmentAngle = 360 * percentage;
		return {
			...item,
			percentage,
			segmentAngle,
			totalValue,
		};
	});

	return (
		<Flex justify="between" align="center" gap="48">
			<PieSegmentList segments={segments} totalAttempt={totalAttempt} />
			<LegendList segments={segments} />
		</Flex>
	);
};
