import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
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

	const { isDirty, isSubmitted } = methods.formState;

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			isDirty && !isSubmitted && currentLocation.pathname !== nextLocation.pathname,
	);

	return (
		<FormProvider {...methods}>
			{blocker.state === 'blocked' ? (
				<BlockerDialog onCancel={blocker.reset} onOk={blocker.proceed} />
			) : null}
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SkillCreateFormHeader />
					<SkillForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
