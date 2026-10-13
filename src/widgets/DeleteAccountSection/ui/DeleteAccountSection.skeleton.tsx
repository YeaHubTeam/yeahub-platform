import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './DeleteAccountSection.module.css';

export const DeleteAccountSectionSkeleton = () => {
	return (
		<CardSkeleton>
			<TextSkeleton isMainTitle variant="head3" width={220} className={styles.title} />
			<TextSkeleton variant="body3" width="80%" className={styles.description} />
			<ButtonSkeleton destructive width={180} />
		</CardSkeleton>
	);
};
