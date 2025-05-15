import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useIsFormNonEmpty } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { QuestionForm } from '@/entities/question';

import { questionCreateSchema } from '../../model/lib/validation/questionCreateSchema';
import { CreateQuestionFormValues } from '../../model/types/questionCreateTypes';
import { QuestionCreateFormHeader } from '../QuestionCreateFormHeader/QuestionCreateFormHeader';

import styles from './QuestionCreateForm.module.css';

export const QuestionCreateForm = () => {
	const methods = useForm<CreateQuestionFormValues>({
		defaultValues: {
			status: 'public',
			rate: 5,
			complexity: 1,
		},
		resolver: yupResolver(questionCreateSchema),
		mode: 'onTouched',
	});

	const { control, formState } = methods;
	const { isDirty, isSubmitted, isSubmitting } = formState;

	const isNonEmpty = useIsFormNonEmpty(control, [
		'title',
		'description',
		'longAnswer',
		'shortAnswer',
	]);

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && isNonEmpty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<QuestionCreateFormHeader />
					<Card className={styles.content}>
						<QuestionForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
