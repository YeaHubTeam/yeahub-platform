import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Card } from '@/shared/ui/Card';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';

import { useGetCollectionByIdQuery } from '@/entities/collection';

import { AdditionalInfo, CollectionBody, CollectionHeader } from '@/widgets/Collection';

import styles from './CollectionPage.module.css';
// import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const { isMobile, isTablet } = useScreenSize();

	const { data: collection, isLoading } = useGetCollectionByIdQuery({
		collectionId: collectionId || '',
	});

	// TO DO SKELETON
	if (isLoading) {
		return 'TODO SKELETON';
	}

	if (!collection) {
		return null;
	}

	const renderAdditionalInfo = (
		<div className={styles['popover-additional']}>
			<Popover
				body={() => (
					<div className={styles['popover-additional-wrapper']}>
						<Card>
							<AdditionalInfo
								collection={collection}
								className={styles['additional-info-wrapper']}
							/>
						</Card>
					</div>
				)}
			>
				{({ onToggle, isOpen }) => (
					<div>
						<IconButton
							className={isOpen ? styles.active : ''}
							aria-label="go to additional info"
							form="square"
							icon={<PopoverIcon />}
							size="S"
							variant="tertiary"
							onClick={onToggle}
						/>
					</div>
				)}
			</Popover>
		</div>
	);

	const renderHeaderAndActions = () => (
		<>
			<CollectionHeader
				collection={collection}
				description={collection.description}
				title={collection.title}
			/>
		</>
	);

	const renderMobileOrTablet = (isMobile || isTablet) && (
		<>
			{renderAdditionalInfo}
			<section
				className={classNames(styles.wrapper, {
					[styles.mobile]: isMobile,
					[styles.tablet]: isTablet,
				})}
			>
				{renderHeaderAndActions()}
				<CollectionBody collection={collection} />
			</section>
		</>
	);

	return (
		<>
			<BackHeader />

			{renderMobileOrTablet || (
				<section className={styles.wrapper}>
					<div className={styles.main}>
						{renderHeaderAndActions()}
						<CollectionBody collection={collection} />
					</div>
					<div className={styles.additional}>
						<AdditionalInfo collection={collection} className={styles['additional-info-wrapper']} />
					</div>
				</section>
			)}
		</>
	);
};
