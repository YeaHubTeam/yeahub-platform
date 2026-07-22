import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import { SkillSelectSkeleton } from '@/entities/skill/@x/topic';

import styles from './TopicForm.module.css';

export const TopicFormSkeleton = () => {
	return (
		<Flex direction="column" className={styles.wrapper}>
			<TextSkeleton variant="body5-strong" width={320} />
			<Flex direction="column" gap="60">
				<Flex gap="120" className={styles['skill-input']}>
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<TextSkeleton variant="body4" width="100%" />
						<TextSkeleton variant="body2" width="100%" />
					</Flex>
					<FormControlSkeleton className={styles['input-form']}>
						<InputSkeleton size="L" />
					</FormControlSkeleton>
				</Flex>
				<FormFieldSkeleton>
					<FormControlSkeleton>
						<SkillSelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>
				<Flex direction="column" gap="20">
					<Flex direction="column" gap="8">
						<TextSkeleton variant="body4" width="100%" />
						<TextSkeleton variant="body2" width="100%" />
					</Flex>
					<FormControlSkeleton className={styles['input-form']}>
						<TextAreaSkeleton className={styles['text-area']} />
					</FormControlSkeleton>
				</Flex>
			</Flex>
		</Flex>
	);
};
