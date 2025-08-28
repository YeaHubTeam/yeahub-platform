import { useParams } from 'react-router-dom';

import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { useGetPublicCollectionByIdQuery } from '@/entities/collection';
import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { getChannelsForSpecialization } from '@/entities/media';
import { getHasPremiumAccess } from '@/entities/profile';
import { useGetPublicQuestionsListQuery, useGetQuestionsListQuery } from '@/entities/question';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
} from '@/widgets/Collection';

import styles from './PublicCollectionPage.module.css';
import { PublicCollectionPageSkeleton } from './PublicCollectionPage.skeleton';

export const PublicCollectionPage = () => {
	const { collectionId } = useParams<{ collectionId: string }>();
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);
	const {
		data: collection,
		isFetching,
		isLoading,
	} = useGetPublicCollectionByIdQuery({ collectionId });

	const { data: publicResponse } = useGetPublicQuestionsListQuery(
		{
			collection: Number(collectionId),
			limit: collection?.questionsCount,
		},
		{ skip: hasPremiumAccess },
	);

	const { data: privateResponse } = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			limit: collection?.questionsCount,
		},
		{ skip: !hasPremiumAccess },
	);
	const { isSmallScreen, isLargeScreen } = useScreenSize();

	const questions = (hasPremiumAccess ? privateResponse?.data : publicResponse?.data) ?? [];

	if (isLoading || isFetching) {
		return <PublicCollectionPageSkeleton />;
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

	return (
		<Flex direction="column" align="start">
			<Flex gap="20" maxWidth>
				<Flex gap="20" direction="column" flex={1} maxWidth>
					<CollectionHeader
						renderDrawer={() => <CollectionAdditionalInfoDrawer collection={collection} />}
						title={title}
						description={description}
						imageSrc={imageSrc}
						company={company}
					/>
					<CollectionBody
						isFree={isFree}
						questions={questions}
						hasPremiumAccess={hasPremiumAccess}
					/>
					{isSmallScreen && guru && <GurusBanner gurus={[guru]} />}
				</Flex>
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
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};
