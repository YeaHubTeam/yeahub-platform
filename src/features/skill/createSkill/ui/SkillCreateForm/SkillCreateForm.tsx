import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { SkillForm } from '@/entities/skill';

import { skillCreateSchema } from '../../lib/validation/skillCreateSchema';
import { CreateSkillFormValues } from '../../model/types/skillCreateTypes';
import { SkillCreateFormHeader } from '../SkillCreateFormHeader/SkillCreateFormHeader';

import styles from './SkillCreateForm.module.css';

const defaultValues = {} satisfies DefaultValues<CreateSkillFormValues>;

export const SkillCreateForm = () => {
	const skillMethods = useForm<CreateSkillFormValues>({
		resolver: yupResolver(skillCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CreateSkillFormValues>({
		watch: skillMethods.watch,
		reset: skillMethods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitting, isSubmitted } = skillMethods.formState;

	return (
		<>
			<FormProvider {...skillMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<SkillCreateFormHeader onSuccess={clearFormDraft} />
						<Card className={styles.content}>
							<SkillForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
