import { useParams } from 'react-router-dom';

import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { useGetPublicCollectionByIdQuery } from '@/entities/collection';
import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { useGetPublicQuestionsListQuery } from '@/entities/question';

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
	const {
		data: collection,
		isFetching,
		isLoading,
	} = useGetPublicCollectionByIdQuery({ collectionId });
	const { data: response } = useGetPublicQuestionsListQuery(
		{
			collection: Number(collectionId),
			limit: collection?.questionsCount,
		},
		{ skip: collection?.questionsCount === undefined },
	);
	const { isSmallScreen, isLargeScreen } = useScreenSize();

	const questions = response?.data ?? [];

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
					<CollectionBody isFree={isFree} questions={questions} />
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
						/>
						{guru && <GurusBanner gurus={[guru]} />}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};
