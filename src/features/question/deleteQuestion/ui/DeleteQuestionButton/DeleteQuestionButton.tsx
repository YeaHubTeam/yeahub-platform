import { Button, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Question } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';

interface DeleteQuestionButtonProps {
	questionId: Question['id'];
}

export const DeleteQuestionButton = ({ questionId }: DeleteQuestionButtonProps) => {
	const [deleteQuestionMutation] = useDeleteQuestionMutation();

	const { t } = useI18nHelpers(i18Namespace.translation);

	const onDeleteQuestion = async () => {
		await deleteQuestionMutation(questionId);
	};

	return (
		<Button
			aria-label="Large"
			style={{ width: 'auto', justifyContent: 'flex-start' }}
			preffix={<Icon icon="trash" size={20} color="--palette-ui-red-600" />}
			theme="tertiary"
			onClick={onDeleteQuestion}
		>
			{t(Translation.DELETE)}
		</Button>
	);
};
