import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { AdditionalBlockSkeleton } from '../AdditionalBlock/AdditionalBlock.skeleton';
import { MainBlockSkeleton } from '../MainBlock/MainBlock.skeleton';

import styles from './InterviewTrainerBlock.module.css';

export const InterviewTrainerBlockSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();
	return (
		<section className={styles['interview-trainer']}>
			<div className={styles['title-block']}>
				<TextSkeleton
					width={isMobile ? 450 : 473}
					variant={isMobile ? 'body5-accent' : 'head3'}
					className={styles.title}
				/>
				<TextSkeleton width={isMobile ? 450 : 473} variant="body3" className={styles.subtitle} />
			</div>
			<Flex
				direction={isTablet || isMobile ? 'column' : 'row'}
				className={styles['interview-trainer-wrapper']}
				align="center"
			>
				<MainBlockSkeleton />
				<AdditionalBlockSkeleton />
			</Flex>
		</section>
	);
};
