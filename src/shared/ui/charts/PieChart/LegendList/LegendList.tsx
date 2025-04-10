import React from 'react';

import { Flex } from '@/shared/ui/Flex';

import { PieSegment } from '../types';
import { LegendItem } from '../LegendItem/LegendItem';

interface LegendListProps {
	segments: PieSegment[];
}

export const LegendList = ({ segments }: LegendListProps) => {
	return (
		<Flex componentType="ul" direction="column" justify="between" gap="24">
			{segments.map((segment, index) => (
				<LegendItem
					key={index}
					name={segment.name}
					color={segment.itemStyle?.color}
					value={segment.value}
				/>
			))}
		</Flex>
	);
};
