import { Flex } from '@/shared/ui/Flex';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { TextEditorSkeleton } from '@/shared/ui/TextEditor';

import styles from './AboutMeTabForm.module.css';

export const AboutMeTabFormSkeleton = () => {
	return (
		<Flex className={styles.container} gap="20">
			<FormFieldSkeleton>
				<div className={styles['textarea-container']}>
					<TextEditorSkeleton isInline />
				</div>
			</FormFieldSkeleton>
		</Flex>
	);
};
