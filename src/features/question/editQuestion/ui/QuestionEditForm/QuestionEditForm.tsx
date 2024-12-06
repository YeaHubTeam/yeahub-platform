import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Question, QuestionForm } from '@/entities/question';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { questionEditSchema } from '../../model/lib/validation/questionEditSchema';
import { EditQuestionFormValues } from '../../model/types/questionEditPageTypes';
import { QuestionEditFormHeader } from '../QuestionEditFormHeader/QuestionEditFormHeader';

import styles from './QuestionEditForm.module.css';

interface QuestionEditFormProps {
	question: Question;
}
const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const QuestionEditForm = ({ question }: QuestionEditFormProps) => {
	const { questionSkills, questionSpecializations, ...formattedQuestion } = question;

	const methods = useForm<EditQuestionFormValues>({
		resolver: yupResolver(questionEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedQuestion,
			skills: formatToFormField<Skill[]>(questionSkills),
			specializations: formatToFormField<Specialization[]>(questionSpecializations),
		},
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
				<BlockerDialog onCancel={blocker.reset} onOk={blocker.proceed} />
			) : null}
			<Flex componentType="main" direction="column" gap="24">
				<QuestionEditFormHeader />
				<Card className={styles.content}>
					<QuestionForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
