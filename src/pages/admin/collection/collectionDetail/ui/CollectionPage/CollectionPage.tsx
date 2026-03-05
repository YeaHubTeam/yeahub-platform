/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { Collections, i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route, useAppSelector, useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useGetCollectionByIdQuery } from '@/entities/collection';
import { getIsAuthor, getProfileId, getUserId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';
import { useGetTasksListQuery } from '@/entities/task';

import { DeleteCollectionButton } from '@/features/collections/deleteCollection';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
} from '@/widgets/Collection';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { TasksController } from '@/widgets/task/TasksList';

import styles from './CollectionPage.module.css';
import { CollectionPageSkeleton } from './CollectionPage.skeleton';

export const CollectionPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isSmallScreen, isMobile, isTablet } = useScreenSize();
	const { collectionId } = useParams<{ collectionId: string }>();
	const {
		data: collection,
		isFetching,
		isLoading,
		isError: isCollectionError,
	} = useGetCollectionByIdQuery({ collectionId });
	const { data: tasksResponse } = useGetTasksListQuery(
		{
			collectionId: collectionId ? Number(collectionId) : undefined,
			limit: 50,
			page: 1,
		},
		{
			skip: !collectionId,
		},
	);
	const tasks = tasksResponse?.data ?? [];
	const isAuthor = useSelector(getIsAuthor);
	const profileId = useAppSelector(getProfileId);
	const userId = useAppSelector(getUserId);
	const {
		data: response,
		isError: isQuestionsError,
		refetch,
	} = useGetQuestionsListQuery(
		{
			collection: Number(collectionId),
			profileId,
			limit: collection?.questionsCount,
		},
		{ skip: collection?.questionsCount === undefined },
	);

	const questions = response?.data ?? [];
	const hasData = questions.length > 0;
	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Collections.STUB_EMPTY_COLLECTION_TITLE),
			subtitle: t(Collections.STUB_EMPTY_COLLECTION_SUBTITLE),
			buttonText: t(Collections.STUB_EMPTY_COLLECTION_SUBMIT),
			onClick: () => refetch(),
		},
		error: { onClick: () => refetch() },
	};

	if (!collection) {
		return null;
	}

	const {
		createdBy,
		questionsCount,
		tasksCount,
		isFree,
		company,
		specializations,
		keywords,
		title,
		description,
		imageSrc: collectionImageSrc,
	} = collection;

	const isDisabled = isAuthor && createdBy?.id !== userId;
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
				<TasksController isFree={isFree} isAdmin tasks={tasks} />
			</section>
		</>
	);

	return (
		<PageWrapper
			roles={['admin', 'author']}
			isLoading={isLoading || isFetching}
			hasError={isCollectionError || isQuestionsError}
			hasData={hasData}
			stubs={stubs}
			skeleton={<CollectionPageSkeleton />}
			content={
				<>
					<BackHeader>
						<DeleteCollectionButton
							collectionId={collection.id}
							isDetailPage
							disabled={isDisabled}
						/>

						<Tooltip
							title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
							placement="bottom-start"
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
								<TasksController isFree={isFree} isAdmin tasks={tasks} />
							</div>
							<div className={styles.additional}>
								<AdditionalInfo
									createdBy={createdBy}
									questionsCount={questionsCount}
									tasksCount={tasksCount}
									isFree={isFree}
									company={company}
									specializations={specializations}
									keywords={keywords}
								/>
							</div>
						</section>
					)}
				</>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};
