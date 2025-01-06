import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { AttemptInfo } from '../../model/types/types';

import styles from './AttemptInfoItem.module.css';

export interface AttemptInfoItemProps {
	attemptItem: AttemptInfo;
}

export const AttemptInfoItem = ({ attemptItem }: AttemptInfoItemProps) => {
	const { isMobile } = useScreenSize();
	const { value, name, itemStyle } = attemptItem;

	return (
		<Flex align="center" gap="12" componentType="li" className={styles.item}>
			<div className={styles.divider} style={{ backgroundColor: itemStyle?.color || 'none' }}></div>
			<Flex direction="column">
				<Text variant={isMobile ? 'body2-accent' : 'body3-accent'} color="black-400">
					{name}
				</Text>
				<Text variant={isMobile ? 'body1-accent' : 'body2-accent'} color="black-700">
					{Math.trunc(value)}%
				</Text>
			</Flex>
		</Flex>
	);
};
