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

const defaultValues: DefaultValues<CreateQuestionFormValues> = {
	status: 'public',
	rate: 5,
	complexity: 1,
	title: '',
	description: '',
	specializations: [],
	skills: [],
	topics: [],
	keywords: [],
	shortAnswer: '',
	longAnswer: '',
};

export const QuestionCreateForm = () => {
	const methods = useForm<CreateQuestionFormValues>({
		resolver: yupResolver(questionCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitted, isSubmitting },
		reset,
		watch,
	} = methods;

	const { clearFormDraft } = useFormPersist<CreateQuestionFormValues>({
		watch,
		reset,
		defaultValues,
	});

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
