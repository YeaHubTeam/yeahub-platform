import { IconButtonSkeleton } from '@/shared/ui/IconButton';

import styles from './SocialNetWorkList.module.css';

export const SocialNetWorkListSkeleton = () => {
	return (
		<div className={styles['card-link']}>
			{Array.from({ length: 5 }).map((_, index) => (
				<IconButtonSkeleton
					key={index}
					type="submit"
					aria-label="primary large"
					form="round"
					size="small"
					variant="primary"
				/>
			))}
		</div>
	);
};
