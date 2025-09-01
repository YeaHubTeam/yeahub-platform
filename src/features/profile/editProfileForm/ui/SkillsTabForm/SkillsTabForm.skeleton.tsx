import { Flex } from '@/shared/ui/Flex';
import { FormFieldSkeleton } from '@/shared/ui/FormField';

import { SkillSelectSkeleton } from '@/entities/skill';

import styles from './SkillsTabForm.module.css';

export const SkillsTabFormSkeleton = () => {
	return (
		<Flex className={styles.container} gap="20">
			<FormFieldSkeleton>
				<SkillSelectSkeleton />
			</FormFieldSkeleton>
		</Flex>
	);
};
