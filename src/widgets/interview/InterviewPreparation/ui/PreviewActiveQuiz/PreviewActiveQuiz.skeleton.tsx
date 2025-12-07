import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { ProgressBarSkeleton } from '@/shared/ui/ProgressBar';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './PreviewActiveQuiz.module.css';

export const PreviewActiveQuizSkeleton = () => {
	return (
		<Flex direction="column" gap="16" className={styles.preparation}>
			<ProgressBarSkeleton label="label" currentCount={1} totalCount={1} />
			<TextSkeleton variant="body4" width="100%" />
			<ImageWithWrapperSkeleton className={styles['image-wrapper']} />
		</Flex>
	);
};
