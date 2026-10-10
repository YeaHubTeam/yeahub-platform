import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormHeader } from '@/shared/ui/FormHeader';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Question, QuestionForm } from '@/entities/question';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';
import { Topic } from '@/entities/topic';

import { useEditQuestionMutation } from '../../api/editQuestionApi';
import { questionEditSchema } from '../../lib/validation/questionEditSchema';
import { EditQuestionFormValues } from '../../model/types/questionEditPageTypes';

import styles from './QuestionEditForm.module.css';

interface QuestionEditFormProps {
	question: Question;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const QuestionEditForm = ({ question }: QuestionEditFormProps) => {
	const { questionSkills, questionSpecializations, questionTopics, ...formattedQuestion } =
		question;

	const methods = useForm<EditQuestionFormValues>({
		resolver: yupResolver(questionEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedQuestion,
			skills: formatToFormField<Skill[]>(questionSkills),
			specializations: formatToFormField<Specialization[]>(questionSpecializations),
			topics: formatToFormField<Topic[]>(questionTopics),
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editQuestionMutation, { isLoading }] = useEditQuestionMutation();

	const onEditQuestion = async (data: EditQuestionFormValues) => {
		await editQuestionMutation(data);
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<FormHeader<EditQuestionFormValues> onSubmit={onEditQuestion} isLoading={isLoading} />
					<Card className={styles.content}>
						<QuestionForm isEdit />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
