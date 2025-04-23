import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { Collection } from '@/entities/collection';

import styles from './CollectionHeader.module.css';

interface CollectionHeaderProps {
	title: string;
	description: string;
}

interface CollectionHeaderProps {
	collection: Collection;
}

export const CollectionHeader = ({ title, description, collection }: CollectionHeaderProps) => {
	const { isDesktop, isMobile } = useScreenSize();

	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card withOutsideShadow>
			{isMobile ? (
				<div className={styles['collection-header-wrapper']}>
					<div className={styles['title-wrapper']}>
						<h2 className={styles.title}>{title}</h2>
					</div>
					<div className={styles['description-wrapper']}>
						<p className={styles.description}>{description}</p>
					</div>
				</div>
			) : (
				<div className={styles['collection-header-wrapper']}>
					{isDesktop && (
						<div className={styles['image-wrapper']}>
							<ImageWithWrapper src={collection.imageSrc} className={imageClassName} />
						</div>
					)}
					<div className={styles['title-wrapper']}>
						<h2 className={styles.title}>{title}</h2>
						<p className={styles.description}>{description}</p>
					</div>

					<div className={styles['description-wrapper']}></div>
				</div>
			)}
		</Card>
	);
};
