import { useParams } from 'react-router-dom';

import { useScreenSize } from '@/shared/hooks';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getProfileId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { TrainCollectionButton } from '@/features/collections/trainCollection';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
} from '@/widgets/Collection';

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

	const { isMobileS, isLargeScreen } = useScreenSize();

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	if (isLoading || isFetching) {
		return <CollectionPageSkeleton />;
	}

	if (!collection) {
		return null;
	}

	const {
		createdBy,
		questionsCount,
		isFree,
		company,
		specializations,
		keywords,
		title,
		description,
		imageSrc: collectionImageSrc,
	} = collection;

	const imageSrc = collectionImageSrc ?? company?.imageSrc;

	const renderHeaderAndActions = () => (
		<>
			<CollectionHeader
				renderDrawer={() => <CollectionAdditionalInfoDrawer collection={collection} />}
				title={title}
				description={description}
				imageSrc={imageSrc}
				company={company}
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
			<section className={styles.wrapper}>
				<div className={styles.main}>
					{renderHeaderAndActions()}
					<CollectionBody isFree={isFree} questions={questions} />
				</div>
				{isLargeScreen && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<AdditionalInfo
							specializations={specializations}
							isFree={isFree}
							company={company}
							questionsCount={questionsCount}
							createdBy={createdBy}
							keywords={keywords}
						/>
					</Flex>
				)}
			</section>
		</>
	);
};
