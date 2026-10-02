import { Flex } from '@/shared/ui/Flex';
import { FormInputDescriptionSkeleton } from '@/shared/ui/form';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';

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

				<FormInputDescriptionSkeleton
					controlClassName={styles['input-form']}
					textAreaClassName={styles.textarea}
				/>
			</Flex>
		</>
	);
};
