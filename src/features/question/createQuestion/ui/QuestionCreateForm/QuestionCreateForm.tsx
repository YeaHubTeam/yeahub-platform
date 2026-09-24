import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { QuestionForm } from '@/entities/question';

import { questionCreateSchema } from '../../lib/validation/questionCreateSchema';
import { CreateQuestionFormValues } from '../../model/types/questionCreateTypes';
import { QuestionCreateFormHeader } from '../QuestionCreateFormHeader/QuestionCreateFormHeader';

import styles from './QuestionCreateForm.module.css';

const defaultValues = {
	status: 'public',
	rate: 5,
	complexity: 1,
} satisfies DefaultValues<CreateQuestionFormValues>;

export const QuestionCreateForm = () => {
	const methods = useForm<CreateQuestionFormValues>({
		defaultValues,
		resolver: yupResolver(questionCreateSchema),
		mode: 'onTouched',
	});

	const { clearFormDraft } = useFormPersist<CreateQuestionFormValues>({
		watch: methods.watch,
		reset: methods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<QuestionCreateFormHeader onSuccess={clearFormDraft} />
					<Card className={styles.content}>
						<QuestionForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
