import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { Collection as CollectionType } from '@/entities/collection';
import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { Question } from '@/entities/question';
import { getChannelsForSpecialization } from '@/entities/socialMedia';

import { CollectionHeader } from '@/widgets/Collection';
import { CollectionAdditionalInfoDrawer } from '@/widgets/Collection';
import { CollectionBody } from '@/widgets/Collection';
import { AdditionalInfo } from '@/widgets/Collection';

import { CollectionActions } from '../CollectionActions/CollectionActions';

import styles from './CollectionContent.module.css';

interface CollectionContentProps {
	collection: CollectionType;
	collectionId: string;
	questions: Question[];
	hasPremiumAccess: boolean;
	profileId: string;
	onMovePrev: () => void;
	onMoveNext: () => void;
	isDisabled: boolean;
}

export const CollectionContent = ({
	collection,
	questions,
	collectionId,
	hasPremiumAccess,
	profileId,
	onMovePrev,
	onMoveNext,
	isDisabled,
}: CollectionContentProps) => {
	const { isLargeScreen, isSmallScreen } = useScreenSize();

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
	const guru = getGuruWithMatchingSpecialization(specializations);
	const showAuthor = !guru;
	const media = getChannelsForSpecialization(specializations);
	const isEmptyData = questions.length === 0;

	return (
		<section className={styles.wrapper}>
			<div className={styles.main}>
				<CollectionHeader
					renderDrawer={() => <CollectionAdditionalInfoDrawer collection={collection} />}
					title={title}
					description={description}
					imageSrc={imageSrc}
					company={company}
				/>

				<CollectionActions
					collectionId={collectionId}
					profileId={profileId}
					isFree={isFree}
					hasPremiumAccess={hasPremiumAccess}
					isEmptyData={isEmptyData}
					onMovePrev={onMovePrev}
					onMoveNext={onMoveNext}
					isDisabled={isDisabled}
				/>

				<CollectionBody isFree={isFree} questions={questions} hasPremiumAccess={hasPremiumAccess} />

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
				</Flex>
			)}
		</section>
	);
};
