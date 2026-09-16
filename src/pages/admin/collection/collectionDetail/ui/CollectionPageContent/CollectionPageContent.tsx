import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { Collection } from '@/entities/collection';
import { Question } from '@/entities/question';
import { Task } from '@/entities/task';

import { useDeleteCollectionMutation } from '@/features/collections/deleteCollection';

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
	const { isSmallScreen } = useScreenSize();
	const [deleteCollection] = useDeleteCollectionMutation();

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
	const handleDeleteCollection = () => {
		void deleteCollection(collection.id);
	};

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
			<HeaderAdminPageDetailCard onDelete={handleDeleteCollection} isDisabled={isDisabled} />

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
