import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
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

	useEffect(() => {}, [methods.formState.isDirty, methods.formState.isSubmitted]);

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			methods.formState.isDirty &&
			!methods.formState.isSubmitted &&
			currentLocation.pathname !== nextLocation.pathname,
	);

	return (
		<FormProvider {...methods}>
			{blocker.state === 'blocked' ? (
				<BlockerDialog onCancel={blocker.reset} onOk={blocker.proceed} />
			) : null}
			<Flex componentType="main" direction="column" gap="24">
				<Card className={styles.content}>
					<SkillEditFormHeader />
					<SkillForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
