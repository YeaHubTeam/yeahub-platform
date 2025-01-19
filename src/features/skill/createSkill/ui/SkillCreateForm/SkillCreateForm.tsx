import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { SkillForm } from '@/entities/skill';

import { skillCreateSchema } from '../../model/lib/validation/skillCreateSchema';
import { CreateSkillFormValues } from '../../model/types/skillCreateTypes';
import { SkillCreateFormHeader } from '../SkillCreateFormHeader/SkillCreateFormHeader';

import styles from './SkillCreateForm.module.css';

export const SkillCreateForm = () => {
	const methods = useForm<CreateSkillFormValues>({
		resolver: yupResolver(skillCreateSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitting, isSubmitted } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<SkillCreateFormHeader />
					<Card className={styles.content}>
						<SkillForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
