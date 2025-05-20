import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './CollectionAdditionalInfoDrawer.module.css';

export const CollectionAdditionalInfoDrawerSkeleton = () => {
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
