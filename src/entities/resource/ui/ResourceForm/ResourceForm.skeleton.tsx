import { DropdownSkeleton } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { InputSkeleton } from '@/shared/ui/Input';
import { KeywordInputSkeleton } from '@/shared/ui/KeywordInput';
import { KeywordSelectSkeleton } from '@/shared/ui/KeywordSelect';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import { SkillSelectSkeleton } from '@/entities/skill/@x/resource';
import { SpecializationSelectSkeleton } from '@/entities/specialization/@x/resource';

import styles from './ResourceForm.module.css';

export const ResourceFormSkeleton = () => {
	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<TextSkeleton variant="body4" width={150} />
				<div className={styles.form}>
					<TextAreaSkeleton className={styles.name} />
				</div>
			</Flex>

			<Flex direction="column" gap="8" className={styles['form-field']}>
				<TextSkeleton variant="body4" width={150} />
				<div className={styles.form}>
					<TextAreaSkeleton className={styles.name} />
				</div>
			</Flex>

			<FormFieldSkeleton>
				<ImageLoaderWithoutCropperSkeleton />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<SpecializationSelectSkeleton />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<SkillSelectSkeleton />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<DropdownSkeleton size="S" />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<div className={styles.select}>
					<KeywordSelectSkeleton />
					<KeywordInputSkeleton />
				</div>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<InputSkeleton size="L" />
			</FormFieldSkeleton>
		</Flex>
	);
};
