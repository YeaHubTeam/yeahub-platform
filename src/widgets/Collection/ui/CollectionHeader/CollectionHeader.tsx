import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import styles from './CollectionHeader.module.css';

interface CollectionHeaderProps {
	title: string;
	description: string;
	imageSrc?: string | null;
}

export const CollectionHeader = ({ title, description, imageSrc }: CollectionHeaderProps) => {
	const { isMobileS } = useScreenSize();

	const imageClassName = isMobileS ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Flex gap="20" direction={isMobileS ? 'column' : 'row'}>
				<ImageWithWrapper src={imageSrc} className={classNames(styles.image, imageClassName)} />
				<Flex direction="column">
					<h2 className={styles.title}>{title}</h2>
					<Text variant="body3-accent" maxRows={!isMobileS ? 4 : undefined}>
						{description}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
