import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

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

	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			isDirty &&
			!isSubmitted &&
			!isSubmitting &&
			currentLocation.pathname !== nextLocation.pathname,
	);

	return (
		<FormProvider {...methods}>
			{blocker.state === 'blocked' ? (
				<BlockerDialog
					onCancel={blocker.reset}
					onOk={blocker.proceed}
					message={'blockModal.confirmDescription'}
				/>
			) : null}
			<Flex componentType="main" direction="column" gap="24">
				<SkillEditFormHeader />
				<Card className={styles.content}>
					<SkillForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
