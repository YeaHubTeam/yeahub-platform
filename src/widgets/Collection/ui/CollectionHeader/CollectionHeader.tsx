import classNames from 'classnames';
import { ReactNode } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import styles from './CollectionHeader.module.css';

interface CollectionHeaderProps
	extends Pick<Collection, 'title' | 'description' | 'imageSrc' | 'company'> {
	renderDrawer: () => ReactNode;
}

export const CollectionHeader = ({
	title,
	description,
	imageSrc: collectionImageSrc,
	company,
	renderDrawer,
}: CollectionHeaderProps) => {
	const { isMobileS, isSmallScreen } = useScreenSize();
	const imageSrc = collectionImageSrc && company?.imageSrc;
	const imageClassName = isMobileS ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex gap="20" direction={isMobileS ? 'column' : 'row'}>
				<ImageWithWrapper src={imageSrc} className={classNames(styles.image, imageClassName)} />
				<Flex flex={1} direction="column">
					<Flex direction="row" gap="8" justify="between" align="start">
						<h2 className={styles.title}>{title}</h2>
						{isSmallScreen && renderDrawer()}
					</Flex>

					<Text variant="body3-accent" maxRows={!isMobileS ? 4 : undefined}>
						{description}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
