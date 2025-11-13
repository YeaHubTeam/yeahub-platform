import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { useGetPublicCollectionByIdQuery } from '@/entities/collection';
import { getGuruWithMatchingSpecialization, GurusBanner } from '@/entities/guru';
import { getChannelsForSpecialization } from '@/entities/media';
import { getHasPremiumAccess } from '@/entities/profile';
import { useGetPublicQuestionsListQuery, useGetQuestionsListQuery } from '@/entities/question';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { useGetCollectionsFilterParams } from '@/features/collections/filterCollections';
import {
	useCollectionQueryNavigate,
	usePublicCollectionNavigation,
} from '@/features/collections/navigateCollection';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
	CollectionNavigation,
} from '@/widgets/Collection';

import styles from './PublicCollectionPage.module.css';
import { PublicCollectionPageSkeleton } from './PublicCollectionPage.skeleton';

export const PublicCollectionPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(i18Namespace.collection);
	const filter = useGetCollectionsFilterParams({
		specialization: DEFAULT_SPECIALIZATION_ID,
		page: 1,
	});
	const { collectionId = '' } = useParams<{ collectionId: string }>();
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
		{ skip: hasPremiumAccess || !collection?.questionsCount },
	);

	const { data: privateResponse } = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			limit: collection?.questionsCount,
		},
		{ skip: !hasPremiumAccess || !collection?.questionsCount },
	);

	const { isSmallScreen, isLargeScreen } = useScreenSize();

	const { onQueryNavigate } = useCollectionQueryNavigate();
	const { prevId, nextId, prevPage, nextPage, isDisabled } = usePublicCollectionNavigation({
		collectionId,
		filter,
	});

	const questions = (hasPremiumAccess ? privateResponse?.data : publicResponse?.data) ?? [];

	if (isLoading || isFetching) {
		return <PublicCollectionPageSkeleton />;
	}

	if (!collection) {
		return null;
	}
	const onMovePrev = () => {
		onQueryNavigate(prevId, prevPage);
	};

	const onMoveNext = () => {
		onQueryNavigate(nextId, nextPage);
	};
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
					<Card>
						<Flex align={'center'} direction={'column'}>
							<Button
								className={styles.button}
								variant={'tertiary'}
								preffix={<Icon icon="watch" size={24} />}
								onClick={() => {
									navigate(ROUTES.avos.page);
								}}
							>
								{t(Collections.BANNER_INTERVIEW_WATCH_BUTTON)}
							</Button>
							<CollectionNavigation
								onMovePrev={onMovePrev}
								onMoveNext={onMoveNext}
								isDisabled={isDisabled}
							/>
						</Flex>
					</Card>
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
