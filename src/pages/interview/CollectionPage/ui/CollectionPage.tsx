import { useParams } from 'react-router-dom';

import { useScreenSize } from '@/shared/hooks';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { getChannelsForSpecialization } from '@/entities/media';
import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { TrainCollectionButton } from '@/features/collections/trainCollection';
import { WatchCollectionButton } from '@/features/collections/watchCollection';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
	InterviewRecordings,
} from '@/widgets/Collection';

import styles from './CollectionPage.module.css';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { collectionId = '' } = useParams<{ collectionId: string }>();
	const { data: collection, isFetching, isLoading } = useGetCollectionByIdQuery({ collectionId });
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);
	const profileId = useAppSelector(getProfileId);
	const { data: response, isSuccess } = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			profileId,
			limit: collection?.questionsCount,
		},
		{ skip: !collection?.questionsCount },
	);

	const { isMobileS, isLargeScreen, isSmallScreen } = useScreenSize();

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

	const guru = getGuruWithMatchingSpecialization(collection.specializations);
	const showAuthor = guru ? false : true;

	const media = getChannelsForSpecialization(collection.specializations);

	const renderHeaderAndActions = () => {
		const canTrain = (isFree || hasPremiumAccess) && !isEmptyData && !isMobileS;
		return (
			<>
				<CollectionHeader
					renderDrawer={() => <CollectionAdditionalInfoDrawer collection={collection} />}
					title={title}
					description={description}
					imageSrc={imageSrc}
					company={company}
				/>
				{canTrain && (
					<Card withOutsideShadow className={styles['train-button']}>
						<Flex justify="center" align="center" gap="20">
							<TrainCollectionButton collectionId={collectionId} profileId={profileId} />
							<WatchCollectionButton />
						</Flex>
					</Card>
				)}
			</>
		);
	};

	return (
		<>
			<section className={styles.wrapper}>
				<div className={styles.main}>
					{renderHeaderAndActions()}
					<CollectionBody
						isFree={isFree}
						questions={questions}
						hasPremiumAccess={hasPremiumAccess}
					/>
					{isSmallScreen && guru && <GurusBanner gurus={[guru]} />}
				</div>
				{isLargeScreen && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<AdditionalInfo
							showAuthor={showAuthor}
							specializations={specializations}
							isFree={isFree}
							company={company}
							questionsCount={questionsCount}
							createdBy={createdBy}
							keywords={keywords}
							media={media}
						/>
						{guru && <GurusBanner gurus={[guru]} />}
						<InterviewRecordings />
					</Flex>
				)}
			</section>
		</>
	);
};
