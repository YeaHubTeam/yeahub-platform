import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderSkeleton } from '@/shared/ui/ImageLoader';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';

import styles from './ResourceForm.module.css';

export const ResourceFormSkeleton = () => {
	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<FormFieldSkeleton direction="column">
				<Skeleton width={240} height={74} borderRadius={16} />
			</FormFieldSkeleton>

			<FormFieldSkeleton direction="column">
				<Skeleton width={240} height={74} borderRadius={16} />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<ImageLoaderSkeleton />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<InputSkeleton size="S" className={styles.select} />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<InputSkeleton size="S" className={styles.select} />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<InputSkeleton size="S" className={styles.select} />
				<ButtonSkeleton size="large" width={210} className={styles['submit-button']} />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<InputSkeleton size="S" className={styles.select} />
			</FormFieldSkeleton>
		</Flex>
	);
};
