import React from 'react';

import { AttemptInfoItemProps } from '@/shared/ui/AttemptInfoItem';
import { Flex } from '@/shared/ui/Flex';

import { LegendItem } from './LegendItem'; // Импортируйте новый компонент

interface LegendListProps {
	attemptData: AttemptInfoItemProps[];
	DEFAULT_COLOR: string;
}

export const LegendList = ({ attemptData, DEFAULT_COLOR }: LegendListProps) => {
	return (
		<Flex direction="column" justify="between" gap="24">
			{attemptData.map((item, index) => (
				<LegendItem
					key={index}
					name={item.name}
					color={item.itemStyle?.color || DEFAULT_COLOR}
					value={item.value}
				/>
			))}
		</Flex>
	);
};
