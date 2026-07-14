import classNames from 'classnames';

import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

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
							<TextSkeleton variant="body6" width="100%" />
						</Flex>
					</Flex>
				</CardSkeleton>
				<CardSkeleton withOutsideShadow>
					<Flex direction="column" gap="20">
						<TextSkeleton variant="body5-accent" width="100%" />
						<TextSkeleton variant="body3-accent" width="100%" />
					</Flex>
				</CardSkeleton>
			</Flex>
		</Flex>
	);
};
