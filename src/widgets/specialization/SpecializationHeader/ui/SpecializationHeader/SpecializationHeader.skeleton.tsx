import classNames from 'classnames';

import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './SpecializationHeader.module.css';

export const SpecializationHeaderSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow>
			<Flex gap="16">
				<div className={classNames(styles['title-img-block'])}>
					<ImageWithWrapperSkeleton className={classNames(styles['title-img-block-image'])} />
				</div>
				<Flex maxWidth direction="column">
					<Skeleton width="100%" height={32} />
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
