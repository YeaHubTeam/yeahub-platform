import React from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './LegendItem.module.css';

interface LegendItemProps {
	name: string;
	color: string | undefined;
	value: number;
}

const DEFAULT_COLOR = '#8C8C8C';

export const LegendItem = ({ name, color = DEFAULT_COLOR, value }: LegendItemProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Flex align="center" gap="12" componentType="li" className={styles.legend}>
			<div className={styles['legend-color']} style={{ backgroundColor: color }} />
			<Flex direction="column" gap="4">
				<Text variant={isMobile ? 'body2-accent' : 'body3-accent'} color="black-400">
					{name}
				</Text>
				<Text variant={isMobile ? 'body1-accent' : 'body2-accent'} color="black-700">
					{value.toFixed(0)}%
				</Text>
			</Flex>
		</Flex>
	);
};
