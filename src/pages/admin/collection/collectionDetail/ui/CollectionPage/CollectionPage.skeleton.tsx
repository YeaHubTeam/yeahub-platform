import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

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
			<>
				<HeaderAdminPageDetailCardSkeleton />
				<section className={classNames(styles.wrapper, styles.mobile)}>
					<CollectionHeaderSkeleton />
					<CollectionBodySkeleton />
					<TasksControllerSkeleton />
				</section>
			</>
		);
	}

	return (
		<>
			<HeaderAdminPageDetailCardSkeleton />
			<section className={styles.wrapper}>
				<div className={styles.main}>
					<CollectionHeaderSkeleton />
					<CollectionBodySkeleton />
					<TasksControllerSkeleton />
				</div>
				<div className={styles.additional}>
					<AdditionalInfoSkeleton />
				</div>
			</section>
		</>
	);
};
