import classNames from 'classnames';

import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './SpecializationCard.module.css';

export const SpecializationCardSkeleton = () => {
	return (
		<Flex>
			<Flex direction="column" gap="24" style={{ flex: '0 1 740px' }}>
				<CardSkeleton withOutsideShadow>
					<Flex gap="16">
						<div className={classNames(styles['title-img-block'])}>
							<ImageWithWrapperSkeleton className={classNames(styles['title-img-block-image'])} />
						</div>
						<Flex maxWidth direction="column">
							<Skeleton width="100%" height={24} />
						</Flex>
					</Flex>
				</CardSkeleton>
				<CardSkeleton withOutsideShadow>
					<Skeleton height={20} style={{ marginBottom: '20px' }} />
					<Skeleton height={55} />
				</CardSkeleton>
			</Flex>
		</Flex>
	);
};
