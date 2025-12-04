import React from 'react';

import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { GuruCardSkeleton } from '../GuruCard/GuruCard.skeleton';

import styles from './GurusBlock.module.css';

export const GurusBlockSkeleton = () => {
	return (
		<CardSkeleton>
			<Flex gap="20" direction={'column'}>
				<Flex gap="8" direction={'column'}>
					<TextSkeleton variant="head3" color="black-800" width={250} />
					<TextSkeleton variant="body3" color="black-800" width={654} className={styles.title} />
				</Flex>
				<div className={styles.grid}>
					{[...Array(6)].map((_, idx) => (
						<GuruCardSkeleton key={idx} />
					))}
				</div>
			</Flex>
		</CardSkeleton>
	);
};
