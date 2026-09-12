import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { InputSkeleton } from '@/shared/ui/Input';
import { KeywordInputSkeleton } from '@/shared/ui/KeywordInput';
import { KeywordSelectSkeleton } from '@/shared/ui/KeywordSelect';
import { RadioSkeleton } from '@/shared/ui/Radio';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import { CompanySelectSkeleton } from '@/entities/company/@x/collection';
import { ChooseQuestionsDrawerSkeleton } from '@/entities/question/@x/collection';
import { SpecializationSelectSkeleton } from '@/entities/specialization/@x/collection';
import { ChooseTasksDrawerSkeleton } from '@/entities/task/@x/collection';

export const CollectionFormSkeleton = () => {
	return (
		<>
			<TextSkeleton width={160} variant="body5-strong" />
			<Flex direction="column" gap="60">
				<FormFieldSkeleton>
					<FormControlSkeleton>
						<InputSkeleton size="L" />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton countTextFields={2}>
					<FormControlSkeleton>
						<CompanySelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton direction="column">
					<FormControlSkeleton>
						<TextAreaSkeleton />
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
					<FormControlSkeleton>
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
