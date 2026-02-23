import { CardSkeleton } from '@/shared/ui/Card';

import { GurusItemSkeleton } from '@/entities/guru';

import styles from './MentorCard.module.css';

export const MentorCardSkeleton = () => {
	return (
		<CardSkeleton
			className={styles.card}
			withOutsideShadow
			size="small"
			actionTitle="actionTitle"
			actionRoute="actionRoute"
			isActionPositionBottom
		>
			<GurusItemSkeleton />
		</CardSkeleton>
	);
};
