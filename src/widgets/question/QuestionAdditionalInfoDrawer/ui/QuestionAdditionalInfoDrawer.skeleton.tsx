import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './QuestionAdditionalInfoDrawer.module.css';

export const QuestionAdditionalInfoDrawerSkeleton = () => {
	return (
		<div className={styles['popover-additional']}>
			<IconButtonSkeleton
				aria-label="go to additional info"
				form="square"
				size="small"
				variant="tertiary"
			/>
		</div>
	);
};
