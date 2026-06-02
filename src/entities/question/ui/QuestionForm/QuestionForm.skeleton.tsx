import { DropdownSkeleton } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { KeywordInputSkeleton } from '@/shared/ui/KeywordInput';
import { KeywordSelectSkeleton } from '@/shared/ui/KeywordSelect';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextEditorSkeleton } from '@/shared/ui/TextEditor';

import { SpecializationSelectSkeleton } from '@/entities/specialization/@x/question';

import styles from './QuestionForm.module.css';

export const QuestionFormSkeleton = () => {
	return (
		<Flex direction="column" gap="40">
			<FormFieldSkeleton direction="column">
				<FormControlSkeleton>
					<Skeleton width="100%" height={180} borderRadius={16} />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton direction="column">
				<FormControlSkeleton>
					<Skeleton width="100%" height={200} borderRadius={16} />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<Skeleton width={360} height="100%" />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<Skeleton width={360} height="100%" />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<DropdownSkeleton size="S" />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<SpecializationSelectSkeleton />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<div className={styles.select}>
						<KeywordSelectSkeleton />
						<KeywordInputSkeleton />
					</div>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton direction="column">
				<FormControlSkeleton>
					<TextEditorSkeleton isInline />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton direction="column">
				<FormControlSkeleton>
					<TextEditorSkeleton isInline />
				</FormControlSkeleton>
			</FormFieldSkeleton>
		</Flex>
	);
};
