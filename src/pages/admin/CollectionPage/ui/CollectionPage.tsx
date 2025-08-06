import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getFullProfile, getProfileId, getUserId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { DeleteCollectionButton } from '@/features/collections/deleteCollection';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
} from '@/widgets/Collection';

import styles from './CollectionPage.module.css';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isSmallScreen, isMobile, isTablet } = useScreenSize();
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection, isFetching, isLoading } = useGetCollectionByIdQuery({ collectionId });
	const { userRoles } = useSelector(getFullProfile);
	const profileId = useAppSelector(getProfileId);
	const userId = useAppSelector(getUserId);
	const { data: response } = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			profileId,
			limit: collection?.questionsCount,
		},
		{ skip: collection?.questionsCount === undefined },
	);

	if (isLoading || isFetching) {
		return <CollectionPageSkeleton />;
	}

	const questions = response?.data ?? [];

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

	const isAdmin = userRoles.some(userRole => userRole.name === "admin")
	const isDisabled = !isAdmin && createdBy?.id !== userId;
	const imageSrc = collectionImageSrc ?? company?.imageSrc;
	const renderMobileOrTablet = isSmallScreen && (
		<>
			<section
				className={classNames(styles.wrapper, {
					[styles.mobile]: isMobile,
					[styles.tablet]: isTablet,
				})}
			>
				<CollectionHeader
					renderDrawer={() => <CollectionAdditionalInfoDrawer collection={collection} />}
					title={title}
					description={description}
					imageSrc={imageSrc}
					company={company}
				/>{' '}
				<CollectionBody isFree={isFree} isAdmin questions={questions} />
			</section>
		</>
	);

	return (
		<>
			<BackHeader>
				<DeleteCollectionButton collectionId={collection.id} isDetailPage disabled={isDisabled} />

				<Tooltip
					title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
					placement={'bottom-start'}
					color="red"
					offsetTooltip={10}
					shouldShowTooltip={isDisabled}
				>
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.collections.edit.page, collection.id)}
					>
						<Button disabled={isDisabled}>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Tooltip>
			</BackHeader>

			{renderMobileOrTablet || (
				<section className={styles.wrapper}>
					<div className={styles.main}>
						<CollectionHeader
							renderDrawer={() => <CollectionAdditionalInfoDrawer collection={collection} />}
							title={title}
							description={description}
							imageSrc={imageSrc}
							company={company}
						/>{' '}
						<CollectionBody isFree={isFree} isAdmin questions={questions} />
					</div>
					<div className={styles.additional}>
						<AdditionalInfo
							createdBy={createdBy}
							questionsCount={questionsCount}
							isFree={isFree}
							company={company}
							specializations={specializations}
							keywords={keywords}
						/>
					</div>
				</section>
			)}
		</>
	);
};
