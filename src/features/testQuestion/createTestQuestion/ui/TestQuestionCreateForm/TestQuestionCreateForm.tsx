import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { TestQuestionForm } from '@/entities/testQuestion';

import { CreateTestQuestionFormValues } from '../../model/types/testQuestionCreateTypes';
import { TestQuestionCreateFormHeader } from '../TestQuestionCreateFormHeader/TestQuestionCreateFormHeader';

export const TestQuestionCreateForm = () => {
	const methods = useForm<CreateTestQuestionFormValues>({
		defaultValues: {
			title: '',
			description: '',
			rate: 5,
			complexity: 1,
			keywords: [],
			variants: {
				a: '',
				b: '',
			},
			successVariants: [],
			specializations: [],
			skills: [],
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<TestQuestionCreateFormHeader />
					<Card>
						<TestQuestionForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
