import React from 'react';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { TopicAdditionalInfoDrawerSkeleton } from '../TopicAdditionalInfoDrawer/TopicAdditionalInfoDrawer.skeleton';

import styles from './TopicHeader.module.css';

export const TopicHeaderSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Card withOutsideShadow className={styles.header}>
			<Flex gap="10" direction={isMobile ? 'column' : 'row'}>
				<Flex direction="column" gap="8" maxWidth>
					<Flex justify="between" align="start" gap="8" maxWidth>
						<TextSkeleton
							width="100%"
							variant={isMobile ? 'body5' : 'body6'}
							isMainTitle
							className={styles.title}
						/>
						{(isMobile || isTablet) && <TopicAdditionalInfoDrawerSkeleton />}
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};
