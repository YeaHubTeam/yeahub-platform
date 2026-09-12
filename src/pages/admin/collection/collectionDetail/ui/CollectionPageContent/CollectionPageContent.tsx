import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route, useScreenSize } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@/shared/ui/Tooltip';

import { Collection } from '@/entities/collection';
import { Question } from '@/entities/question';
import { Task } from '@/entities/task';

import { DeleteCollectionButton } from '@/features/collections/deleteCollection';

import {
	AdditionalInfo,
	CollectionAdditionalInfoDrawer,
	CollectionBody,
	CollectionHeader,
} from '@/widgets/Collection';
import { TasksController } from '@/widgets/task/TasksList';

import styles from './CollectionPageContent.module.css';

interface CollectionPageContentProps {
	collection: Collection;
	questions: Question[];
	tasks?: Task[];
	isDisabled: boolean;
	isLoading: boolean;
}

export const CollectionPageContent = ({
	collection,
	questions,
	tasks,
	isDisabled,
}: CollectionPageContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isSmallScreen } = useScreenSize();

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

	const imageSrc = collectionImageSrc ?? company?.imageSrc;

	const renderMobileOrTablet = isSmallScreen && (
		<>
			<section
				className={classNames(styles.wrapper, {
					[styles.mobile]: isSmallScreen,
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
				{tasks?.length ? <TasksController isFree={Boolean(isFree)} isAdmin tasks={tasks} /> : null}
			</section>
		</>
	);
	return (
		<>
			<BackHeader>
				<DeleteCollectionButton collectionId={collection.id} isDetailPage disabled={isDisabled} />

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
						{tasks?.length ? (
							<TasksController isFree={Boolean(isFree)} isAdmin tasks={tasks} />
						) : null}
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
	);
};
