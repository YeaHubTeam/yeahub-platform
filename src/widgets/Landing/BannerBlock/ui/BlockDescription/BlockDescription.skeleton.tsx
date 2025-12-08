import { useScreenSize } from '@/shared/libs';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './BlockDescription.module.css';

export const BlockDescriptionSkeleton = () => {
	const { isMobile } = useScreenSize();
	const variant = isMobile ? 'body3-accent' : 'body6';

	return (
		<>
			<TextSkeleton
				width={isMobile ? '92%' : '100%'}
				className={styles.description}
				variant={variant}
			/>
		</>
	);
};
