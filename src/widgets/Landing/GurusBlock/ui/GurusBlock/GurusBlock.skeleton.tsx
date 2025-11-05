import React from 'react';

import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './GurusBlock.module.css';

export const GurusBlockSkeleton = () => {
	return (
		<CardSkeleton>
			<Flex gap="20" direction={'column'}>
				<Flex gap="8" direction={'column'}>
					<TextSkeleton variant="head3" color="black-800" width={250} />
					<TextSkeleton
						variant="body3"
						color="black-800"
						width={654}
						className={styles['skeleton-description']}
					/>
				</Flex>
				<div className={styles['grid-skeleton']}>
					{[...Array(6)].map((_, idx) => (
						<CardSkeleton key={idx} withOutsideShadow>
							<Flex componentType="li" direction="column" className={styles['card-skeleton']}>
								<Flex gap="20" direction={'column'}>
									<Flex gap="8" direction={'column'} align={'center'}>
										<IconSkeleton size={40} borderRadius="50%" />
										<TextSkeleton variant="body3-accent" color="black-800" width={120} />
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
					))}
				</div>
			</Flex>
		</CardSkeleton>
	);
};
