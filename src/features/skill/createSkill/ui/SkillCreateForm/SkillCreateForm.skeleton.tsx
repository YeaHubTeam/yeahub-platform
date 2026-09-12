import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SkillFormSkeleton } from '@/entities/skill';

import styles from './SkillCreateForm.module.css';

export const SkillCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<Flex align="center" gap="8" justify="between">
				<BackButtonSkeleton />
				<ButtonSkeleton width={150} />
			</Flex>

			<CardSkeleton className={styles.content}>
				<SkillFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};
