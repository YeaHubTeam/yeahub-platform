import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

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

	return (
		<FormProvider {...methods}>
			<Flex componentType="main" direction="column" gap="24">
				<QuestionEditFormHeader />
				<Card className={styles.content}>
					<QuestionForm />
				</Card>
			</Flex>
		</FormProvider>
	);
};
