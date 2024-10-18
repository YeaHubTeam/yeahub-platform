import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { QuestionForm } from '@/entities/question';

import { questionCreateSchema } from '../../model/lib/validation/questionCreateSchema';
import { QuestionCreateSchema } from '../../model/types/questionCreatePageTypes';
import { QuestionCreateFormHeader } from '../QuestionCreateFormHeader/QuestionCreateFormHeader';

import styles from './QuestionCreateForm.module.css';

export const QuestionCreateForm = () => {
	const methods = useForm<QuestionCreateSchema>({
		defaultValues: {
			status: 'public',
			rate: 5,
			complexity: 1,
		},
		resolver: yupResolver(questionCreateSchema),
		mode: 'onTouched',
	});
	return (
		<FormProvider {...methods}>
			<Flex componentType="main" direction="column" gap="24">
				<QuestionCreateFormHeader />
				<Card className={styles.content}>
					<QuestionForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
