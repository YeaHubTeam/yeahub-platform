import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Skill, SkillForm } from '@/entities/skill';

import { skillEditSchema } from '../../lib/validation/skillEditSchema';
import { EditSkillFormValues } from '../../model/types/skillEditPageTypes';
import { SkillEditFormHeader } from '../SkillEditFormHeader/SkillEditFormHeader';

import styles from './SkillEditForm.module.css';

interface SkillEditFormProps {
	skill: Skill;
}

export const SkillEditForm = ({ skill }: SkillEditFormProps) => {
	const specializationsIds = useMemo(
		() => skill.specializations?.map((specialization) => specialization.id),
		[skill],
	);

	const methods = useForm<EditSkillFormValues>({
		resolver: yupResolver(skillEditSchema),
		mode: 'onTouched',
		defaultValues: { ...skill, specializations: specializationsIds },
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<SkillEditFormHeader />
					<Card className={styles.content}>
						<SkillForm isEdit imageSrc={skill.imageSrc} />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
