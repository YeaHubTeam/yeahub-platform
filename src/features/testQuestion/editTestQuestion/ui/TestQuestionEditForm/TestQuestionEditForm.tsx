import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';
import { TestQuestion, TestQuestionForm } from '@/entities/testQuestion';

import { EditTestQuestionFormValues } from '../../model/types/testQuestionEditTypes';
import { TestQuestionEditFormHeader } from '../TestQuestionEditFormHeader/TestQuestionEditFormHeader';

interface TestQuestionEditFormProps {
	testQuestion: TestQuestion;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const TestQuestionEditForm = ({ testQuestion }: TestQuestionEditFormProps) => {
	const { questionSpecializations, questionSkills, ...restTestQuestion } = testQuestion;

	const methods = useForm<EditTestQuestionFormValues>({
		defaultValues: {
			...restTestQuestion,
			specializations: formatToFormField<Specialization[]>(questionSpecializations),
			skills: formatToFormField<Skill[]>(questionSkills),
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<TestQuestionEditFormHeader />
					<Card>
						<TestQuestionForm isEdit />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
