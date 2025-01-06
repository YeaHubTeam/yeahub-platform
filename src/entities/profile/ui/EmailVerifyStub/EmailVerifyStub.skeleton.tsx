import { CardSkeleton } from '@/shared/ui/Card';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './EmailVerifyStub.module.css';

export const EmailVerifyStubSkeleton = () => {
	return (
		<CardSkeleton
			className={styles.card}
			isActionPositionBottom
			withOutsideShadow
			title="title"
			actionTitle="actionTitle"
			actionRoute="actionRoute"
		>
			<TextSkeleton variant="body2-accent" width="100%" />
		</CardSkeleton>
	);
};
