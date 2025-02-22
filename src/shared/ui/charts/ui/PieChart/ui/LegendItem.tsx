import React from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from '../PieChart.module.css';

interface LegendItemProps {
	name: string;
	color: string | undefined;
	value: number;
}

export const LegendItem = ({ name, color, value }: LegendItemProps) => {
	return (
		<Flex align="center">
			<div className={styles['legend-color']} style={{ backgroundColor: color }} />
			<Flex direction="column" gap="4">
				<Text color="black-400" variant="body3">
					{name}
				</Text>
				<Text color="black-700" variant="body2-accent">
					{value.toFixed(0)}%
				</Text>
			</Flex>
		</Flex>
	);
};
