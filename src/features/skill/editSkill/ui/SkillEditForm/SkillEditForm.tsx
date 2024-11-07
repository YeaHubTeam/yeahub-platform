import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Skill, SkillForm } from '@/entities/skill';

import { skillEditSchema } from '../../model/lib/validation/skillEditSchema';
import { SkillEditFormHeader } from '../SkillEditFormHeader/SkillEditFormHeader';

import styles from './SkillEditForm.module.css';

interface SkillEditFormProps {
	skill: Skill;
}

export const SkillEditForm = ({ skill }: SkillEditFormProps) => {
	const methods = useForm<Skill>({
		resolver: yupResolver(skillEditSchema),
		mode: 'onTouched',
		defaultValues: { ...skill },
	});

	return (
		<FormProvider {...methods}>
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SkillEditFormHeader />
					<SkillForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
