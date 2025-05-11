import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { useModal, useScreenSize } from '@/shared/hooks';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getProfileId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { TrainCollectionButton } from '@/features/collections/trainCollection';

import { AdditionalInfo, CollectionBody, CollectionHeader } from '@/widgets/Collection';

import styles from './CollectionPage.module.css';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection, isFetching, isLoading } = useGetCollectionByIdQuery({ collectionId });
	const profileId = useAppSelector(getProfileId);
	const { data: response, isSuccess } = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			profileId,
			limit: collection?.questionsCount,
		},
		{ skip: collection?.questionsCount === undefined },
	);

	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	if (isLoading || isFetching) {
		return <CollectionPageSkeleton />;
	}

	if (!collection) {
		return null;
	}

	const renderAdditionalInfoDrawer = (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label="go to additional info"
				form="square"
				icon={<PopoverIcon />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				rootName={isMobileS ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<div className={styles['popover-additional-wrapper']}>
					<AdditionalInfo collection={collection} />
				</div>
			</Drawer>
		</div>
	);

	const renderHeaderAndActions = () => (
		<>
			<CollectionHeader
				imageSrc={collection.imageSrc || collection.company?.imageSrc}
				description={collection.description}
				title={collection.title}
			/>
			{!isEmptyData && !isMobileS && (
				<Card withOutsideShadow className={styles['train-button']}>
					<Flex justify="center" align="center">
						<TrainCollectionButton collectionId={collectionId} profileId={profileId} />
					</Flex>
				</Card>
			)}
		</>
	);

	return (
		<>
			{renderAdditionalInfoDrawer}
			<section className={styles.wrapper}>
				<div className={styles.main}>
					{renderHeaderAndActions()}
					<CollectionBody questions={questions} />
				</div>
				<AdditionalInfo collection={collection} className={styles.additional} />
			</section>
		</>
	);
};
