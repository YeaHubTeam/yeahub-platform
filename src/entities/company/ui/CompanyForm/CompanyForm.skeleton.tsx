import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './CompanyForm.module.css';

export const CompanyFormSkeleton = () => {
	return (
		<>
			<TextSkeleton variant="body6" width={200} className={styles['main-title']} />

			<Flex direction="column" gap="60" className={styles['form-container']}>
				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['input-form']}>
						<InputSkeleton size="L" />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<ImageLoaderWithoutCropperSkeleton />
				</FormFieldSkeleton>
			</Flex>
		</>
	);
};
