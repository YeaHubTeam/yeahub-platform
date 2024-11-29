import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

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
				<QuestionCreateFormHeader />
				<Card className={styles.content}>
					<QuestionForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
