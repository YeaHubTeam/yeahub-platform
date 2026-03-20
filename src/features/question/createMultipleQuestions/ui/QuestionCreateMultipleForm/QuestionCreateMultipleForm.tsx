import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { QuestionMultipleForm } from '@/entities/question';

import { createMultipleQuestionsSchema } from '../../lib/validation/createMultipleQuestionsSchema';
import { CreateMultipleQuestionsFormValues } from '../../model/types/createMultipleQuestionsTypes';
import { QuestionCreateMultipleFormHeader } from '../QuestionCreateMultipleFormHeader/QuestionCreateMultipleFormHeader';

import styles from './QuestionCreateMultipleForm.module.css';

interface QuestionCreateMultipleFormProps {
	handleOpenGeneratedQuestionsWidget: () => void;
}

export const QuestionCreateMultipleForm = ({
	handleOpenGeneratedQuestionsWidget,
}: QuestionCreateMultipleFormProps) => {
	const methods = useForm<CreateMultipleQuestionsFormValues>({
		defaultValues: {
			specializationId: null,
			questions: [''],
		},
		resolver: yupResolver(createMultipleQuestionsSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<QuestionCreateMultipleFormHeader
						handleOpenGeneratedQuestionsWidget={handleOpenGeneratedQuestionsWidget}
					/>
					<Card className={styles.content}>
						<QuestionMultipleForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
