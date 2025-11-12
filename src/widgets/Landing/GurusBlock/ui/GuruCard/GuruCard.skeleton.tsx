import React from 'react';

import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './GurusCard.module.css';

export const GuruCardSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow>
			<Flex componentType="li" direction="column">
				<Flex gap="20" direction={'column'}>
					<Flex gap="8" direction={'column'} align={'center'}>
						<IconSkeleton size={40} borderRadius="50%" />
						<StatusChipSkeleton />
					</Flex>

					<Flex gap={'4'} direction={'column'}>
						<TextSkeleton variant="body3-accent" color="black-800" width={140} />
						<TextSkeleton variant="body3-accent" color="black-500" width={140} />
					</Flex>

					<TextSkeleton variant="head1" color="black-800" width={'100%'} />

					<TextSkeleton
						variant="body3-accent"
						color="black-800"
						className={styles['more-link-skeleton']}
						width={120}
					/>
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
