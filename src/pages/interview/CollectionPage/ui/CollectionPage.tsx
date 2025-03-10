import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getProfileId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { TrainCollectionButton } from '@/features/collections/trainCollection';

import { AdditionalInfo, CollectionBody, CollectionHeader } from '@/widgets/Collection';

import styles from './CollectionPage.module.css';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection, isFetching, isLoading } = useGetCollectionByIdQuery({ collectionId });
	const profileId = useAppSelector(getProfileId);
	const { data: response, isSuccess } = useGetQuestionsListQuery({
		collection: Number(collectionId),
		profileId,
	});
	const { isMobile, isTablet } = useScreenSize();

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	if (isEmptyData) {
		return (
			<Text variant="body4" color="black-700" className={styles['no-questions']}>
				{t(Questions.PREVIEW_EMPTY)}
			</Text>
		);
	}

	if (isLoading || isFetching) {
		return <CollectionPageSkeleton />;
	}

	if (!collection) {
		return null;
	}

	const renderAdditionalInfo = (
		<div className={styles['popover-additional']}>
			<Popover
				body={
					<div className={styles['popover-additional-wrapper']}>
						<Card>
							<AdditionalInfo
								collection={collection}
								className={styles['additional-info-wrapper']}
							/>
						</Card>
					</div>
				}
			>
				{({ onToggle, isOpen }) => (
					<div>
						<IconButton
							className={isOpen ? styles.active : ''}
							aria-label="go to additional info"
							form="square"
							icon={<PopoverIcon />}
							size="small"
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
			<Card>
				<Flex justify="center" align="center">
					<TrainCollectionButton collectionId={collectionId} profileId={profileId} />
				</Flex>
			</Card>
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
				<CollectionBody questions={questions} />
			</section>
		</>
	);

	return (
		<>
			{renderMobileOrTablet || (
				<section className={styles.wrapper}>
					<div className={styles.main}>
						{renderHeaderAndActions()}
						<CollectionBody questions={questions} />
					</div>
					<div className={styles.additional}>
						<AdditionalInfo collection={collection} className={styles['additional-info-wrapper']} />
					</div>
				</section>
			)}
		</>
	);
};
