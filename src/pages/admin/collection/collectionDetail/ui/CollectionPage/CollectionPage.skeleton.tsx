import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

import { DeleteQuestionButtonSkeleton } from '@/features/question/deleteQuestion';

import {
	AdditionalInfoSkeleton,
	CollectionBodySkeleton,
	CollectionHeaderSkeleton,
} from '@/widgets/Collection';
import { TasksControllerSkeleton } from '@/widgets/task/TasksList';

import styles from './CollectionPage.module.css';

export const CollectionPageSkeleton = () => {
	const { isSmallScreen } = useScreenSize();

	if (isSmallScreen) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				<BackHeaderSkeleton>
					<DeleteQuestionButtonSkeleton isDetailPage />
					<ButtonSkeleton width={180} />
				</BackHeaderSkeleton>
				<CollectionHeaderSkeleton />
				<CollectionBodySkeleton />
				<TasksControllerSkeleton />
			</section>
		);
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles.main}>
				<BackHeaderSkeleton>
					<DeleteQuestionButtonSkeleton isDetailPage />
					<ButtonSkeleton width={180} />
				</BackHeaderSkeleton>
				<CollectionHeaderSkeleton />
				<CollectionBodySkeleton />
				<TasksControllerSkeleton />
			</div>
			<AdditionalInfoSkeleton />
		</section>
	);
};
