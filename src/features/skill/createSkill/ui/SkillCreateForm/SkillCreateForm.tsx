import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useIsFormNonEmpty } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { SkillForm } from '@/entities/skill';

import { skillCreateSchema } from '../../model/lib/validation/skillCreateSchema';
import { CreateSkillFormValues } from '../../model/types/skillCreateTypes';
import { SkillCreateFormHeader } from '../SkillCreateFormHeader/SkillCreateFormHeader';

import styles from './SkillCreateForm.module.css';

export const SkillCreateForm = () => {
	const skillMethods = useForm<CreateSkillFormValues>({
		resolver: yupResolver(skillCreateSchema),
		mode: 'onTouched',
	});

	const { control, formState } = skillMethods;
	const { isDirty, isSubmitted, isSubmitting } = formState;

	const isNonEmpty = useIsFormNonEmpty(control, ['title', 'description']);

	return (
		<>
			<FormProvider {...skillMethods}>
				<LeavingPageBlocker isBlocked={isDirty && isNonEmpty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<SkillCreateFormHeader />
						<Card className={styles.content}>
							<SkillForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
