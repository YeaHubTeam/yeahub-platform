import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { SkillForm } from '@/entities/skill';

import { skillCreateSchema } from '../../model/lib/validation/skillCreateSchema';
import { SkillCreateSchema } from '../../model/types/skillCreateTypes';
import { SkillCreateFormHeader } from '../SkillCreateFormHeader/SkillCreateFormHeader';

import styles from './SkillCreateForm.module.css';

export const SkillCreateForm = () => {
	const methods = useForm<SkillCreateSchema>({
		resolver: yupResolver(skillCreateSchema),
		mode: 'onTouched',
	});
	return (
		<FormProvider {...methods}>
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SkillCreateFormHeader />
					<SkillForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
