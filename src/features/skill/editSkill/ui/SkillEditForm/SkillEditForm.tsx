import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Skill, SkillForm } from '@/entities/skill';

import { EditSkillFormValues } from '@/features/skill/editSkill/model/types/skillEditPageTypes';

import { skillEditSchema } from '../../model/lib/validation/skillEditSchema';
import { SkillEditFormHeader } from '../SkillEditFormHeader/SkillEditFormHeader';

import styles from './SkillEditForm.module.css';

interface SkillEditFormProps {
	skill: Skill;
}

export const SkillEditForm = ({ skill }: SkillEditFormProps) => {
	const methods = useForm<EditSkillFormValues>({
		resolver: yupResolver(skillEditSchema),
		mode: 'onTouched',
		defaultValues: { ...skill },
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<SkillEditFormHeader />
					<Card className={styles.content}>
						<SkillForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
