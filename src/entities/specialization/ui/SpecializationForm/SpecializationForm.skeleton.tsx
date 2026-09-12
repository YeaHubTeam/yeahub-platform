import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import styles from './SpecializationForm.module.css';

export const SpecializationFormSkeleton = () => {
	return (
		<Flex direction="column" className={styles.wrapper}>
			<TextSkeleton variant="body3-strong" width={240} />

			<Flex direction="column" gap="40">
				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['input-form']}>
						<InputSkeleton className={styles.input} size="L" />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton direction="column">
					<FormControlSkeleton className={styles['input-form']}>
						<TextAreaSkeleton className={styles['text-area']} />
					</FormControlSkeleton>
				</FormFieldSkeleton>
			</Flex>
		</Flex>
	);
};
