import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getProfileId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { DeleteCollectionButton } from '@/features/collections/deleteCollection';

import { AdditionalInfo, CollectionBody, CollectionHeader } from '@/widgets/Collection';

import styles from './CollectionPage.module.css';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobile, isTablet } = useScreenSize();
	const { collectionId } = useParams<{ collectionId: string }>();
	const { data: collection, isFetching, isLoading } = useGetCollectionByIdQuery({ collectionId });
	const profileId = useAppSelector(getProfileId);
	const { data: response } = useGetQuestionsListQuery({
		collection: Number(collectionId),
		profileId,
	});

	if (isLoading || isFetching) {
		return <CollectionPageSkeleton />;
	}

	const questions = response?.data ?? [];

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
			<BackHeader>
				<DeleteCollectionButton collectionId={collection.id} isDetailPage />
				<NavLink
					style={{ marginLeft: 'auto' }}
					to={route(ROUTES.admin.collections.edit.page, collection.id)}
				>
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</BackHeader>

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
