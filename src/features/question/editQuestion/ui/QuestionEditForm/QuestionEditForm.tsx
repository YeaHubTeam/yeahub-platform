import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';

import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Question, QuestionForm } from '@/entities/question';

import { questionEditSchema } from '../../model/lib/validation/questionEditSchema';
import { QuestionEditSchema } from '../../model/types/questionEditPageTypes';
import { QuestionEditFormHeader } from '../QuestionEditFormHeader/QuestionEditFormHeader';

import styles from './QuestionEditForm.module.css';

interface QuestionEditFormProps {
	question: Question;
}

export const QuestionEditForm = ({ question }: QuestionEditFormProps) => {
	const methods = useForm<QuestionEditSchema>({
		resolver: yupResolver(questionEditSchema),
		mode: 'onTouched',
		defaultValues: { ...question },
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
				<QuestionEditFormHeader />
				<Card className={styles.content}>
					<QuestionForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
