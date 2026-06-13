import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { KeywordSelectSkeleton } from '@/shared/ui/KeywordSelect';
import { KeywordInputSkeleton } from '@/shared/ui/KeywordInput';
import { ChooseQuestionsDrawerSkeleton } from '@/entities/question';
import { SpecializationSelectSkeleton } from '@/entities/specialization';

import styles from './CollectionForm.module.css';
import { CompanySelectSkeleton } from '@/entities/company';
import { RadioSkeleton } from '@/shared/ui/Radio';
import { ChooseTasksDrawerSkeleton } from '@/entities/task/ui/ChooseTasksDrawer/ChooseTasksDrawer.skeleton';

export const CollectionFormSkeleton = () => {
	return (
		<>
			<TextSkeleton width={160} variant="body5" />

			<Flex direction="column" gap="60">

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['skeleton-form-field']}>
						<InputSkeleton size="L" />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton countTextFields={2}>
					<FormControlSkeleton>
						<CompanySelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton direction="column" >
					<FormControlSkeleton>
						<TextAreaSkeleton
							className={styles['skeleton-textarea']}
							width={225}
							height={80}
							borderRadius={24}
						/>
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<ImageLoaderWithoutCropperSkeleton />
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<Flex gap="56">
						<RadioSkeleton />
						<RadioSkeleton />
					</Flex>
				</FormFieldSkeleton>

				<FormFieldSkeleton countTextFields={2}>
					<FormControlSkeleton>
						<SpecializationSelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['skeleton-keywords-control']}>
						<Flex direction="column" gap="26" maxHeight={true}>
							<KeywordSelectSkeleton />
							<KeywordInputSkeleton />
						</Flex>
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormControlSkeleton>
					<ChooseQuestionsDrawerSkeleton />
				</FormControlSkeleton>

				<FormControlSkeleton>
					<ChooseTasksDrawerSkeleton />
				</FormControlSkeleton>
			</Flex>
		</>
	);
};
