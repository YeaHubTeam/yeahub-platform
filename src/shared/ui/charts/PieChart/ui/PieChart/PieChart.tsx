import React from 'react';

import { Flex } from '@/shared/ui/Flex';
import { AttemptInfo } from '@/shared/ui/PercentsInfoPie/model/types/types';

import { PieSegment } from '../../model/types/types';
import { LegendList } from '../LegendList/LegendList';
import { PieSegmentList } from '../PieSegmentList/PieSegmentList';

interface PieChartProps {
	/**
	 * Total number of items.
	 */
	totalAttempt: number;
	/**
	 * An array of data to display the chart segments.
	 */
	pieData: AttemptInfo[];
}

/**
 * The PieChart component is used to display a circular chart showing the total number of items, as well as their distribution across segments.
 * The component also includes a sidebar that displays the percentages for various conditions or categories.
 * @param totalAttempt
 * @param pieData
 * @constructor
 */

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
		<Flex justify="between" align="center">
			<PieSegmentList segments={segments} totalAttempt={totalAttempt} />
			<LegendList segments={segments} />
		</Flex>
	);
};
