import { useTranslation } from 'react-i18next';
import { Button, Icon } from 'yeahub-ui-kit';

import { TranslationsAdmin } from '@/shared/config/i18n/i18nTranslations';

import { QuestionAdmin } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';

interface DeleteQuestionButtonProps {
	questionId: QuestionAdmin['id'];
}

export const DeleteQuestionButton = ({ questionId }: DeleteQuestionButtonProps) => {
	const [deleteQuestionMutation] = useDeleteQuestionMutation();
	const { t } = useTranslation('question');
	const onDeleteQuestion = async () => {
		await deleteQuestionMutation(questionId);
	};

	return (
		<Button
			aria-label="Large"
			style={{ width: 'auto' }}
			preffix={
				<Icon onClick={onDeleteQuestion} icon="trash" size={20} color="--palette-ui-red-600" />
			}
			theme="tertiary"
		>
			{t(TranslationsAdmin.QUESTION_DELETE)}
		</Button>
	);
};
