import { BannerSkeleton } from '@/shared/ui/Banner';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { MentorCardSkeleton } from '../MentorCard/MentorsCard.skeleton';

import styles from './MentorsBlock.module.css';

export const MentorsBlockSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			<CardSkeleton>
				<Flex direction="column" gap="20">
					<Flex direction="column" gap="8">
						<TextSkeleton width="100%" variant="head3" />

						<TextSkeleton width="100%" variant="body3" />
					</Flex>

					<div className={styles.grid}>
						{[...Array(5)].map((_, i) => (
							<MentorCardSkeleton key={i} />
						))}
					</div>
				</Flex>
			</CardSkeleton>
			<BannerSkeleton />
		</Flex>
	);
};
