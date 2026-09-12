import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import { SpecializationSelectSkeleton } from '@/entities/specialization/@x/skill';

import styles from './SkillForm.module.css';

export const SkillFormSkeleton = () => {
	return (
		<>
			<TextSkeleton variant="body5-strong" width={260} className={styles['main-title']} />

			<Flex direction="column" gap="60">
				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['input-form']}>
						<InputSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<ImageLoaderWithoutCropperSkeleton />
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles.select}>
						<SpecializationSelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['input-form']}>
						<TextAreaSkeleton className={styles.textarea} />
					</FormControlSkeleton>
				</FormFieldSkeleton>
			</Flex>
		</>
	);
};
