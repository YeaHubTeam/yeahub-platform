import React from 'react';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionAdditionalInfoDrawerSkeleton } from '@/widgets/question/QuestionAdditionalInfoDrawer';

import styles from './QuestionHeader.module.css';

export const QuestionHeaderSkeleton = () => {
	const { isMobile, isDesktop, isTablet } = useScreenSize();
	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card withOutsideShadow className={styles.header}>
			<Flex gap="10" direction={isMobile ? 'column' : 'row'}>
				{isDesktop && <ImageWithWrapperSkeleton className={imageClassName} />}
				<Flex direction="column" gap="8" maxWidth>
					<Flex justify="between" align="start" gap="8" maxWidth>
						<TextSkeleton
							width="100%"
							variant={isMobile ? 'body5' : 'body6'}
							isMainTitle
							className={styles.title}
						/>
						{(isMobile || isTablet) && <QuestionAdditionalInfoDrawerSkeleton />}
						{/*{project === 'admin' && <QuestionStatusChipSkeleton />}*/}
					</Flex>
					<TextSkeleton width="100%" variant="body3-accent" color="black-800" />
				</Flex>
			</Flex>
		</Card>
	);
};
