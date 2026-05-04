import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { ImageLoaderSkeleton } from '@/shared/ui/ImageLoader';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ResourceForm.module.css';

export const ResourceFormSkeleton = () => {
	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<TextSkeleton variant="body4" width={110} />
				<TextSkeleton variant="body2" width={150} />
				<Skeleton width={240} height={74} borderRadius={16} />
			</Flex>

			<Flex direction="column" gap="8" className={styles['form-field']}>
				<TextSkeleton variant="body4" width={140} />
				<TextSkeleton variant="body2" width={170} />
				<Skeleton width={240} height={74} borderRadius={16} />
			</Flex>

			<Flex direction="row" gap="120" className={styles['form-field']}>
				<Flex direction="column" gap="8" className={styles['form-field']}>
					<TextSkeleton variant="body4" width={140} />
					<TextSkeleton variant="body2" width={170} />
				</Flex>
				<Flex>
					<ImageLoaderSkeleton />
				</Flex>
			</Flex>

			<Flex direction="row" gap="120" className={styles['form-field']}>
				<Flex direction="column" gap="8" className={styles['form-field']}>
					<TextSkeleton variant="body4" width={140} />
					<TextSkeleton variant="body2" width={170} />
				</Flex>
				<InputSkeleton size="S" className={styles.select} />
			</Flex>

			<Flex direction="row" gap="120" className={styles['form-field']}>
				<Flex direction="column" gap="8" className={styles['form-field']}>
					<TextSkeleton variant="body4" width={140} />
					<TextSkeleton variant="body2" width={170} />
				</Flex>
				<InputSkeleton size="S" className={styles.select} />
			</Flex>

			<Flex direction="row" gap="120" className={styles['form-field']}>
				<Flex direction="column" gap="8" className={styles['form-field']}>
					<TextSkeleton variant="body4" width={140} />
					<TextSkeleton variant="body2" width={170} />
				</Flex>
				<InputSkeleton size="S" className={styles.select} />
				<ButtonSkeleton size="large" width={210} className={styles['submit-button']} />
			</Flex>

			<Flex direction="row" gap="120" className={styles['form-field']}>
				<Flex direction="column" gap="8" className={styles['form-field']}>
					<TextSkeleton variant="body4" width={140} />
					<TextSkeleton variant="body2" width={170} />
				</Flex>
				<InputSkeleton size="S" className={styles.select} />
			</Flex>
		</Flex>
	);
};
