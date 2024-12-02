import { useFormContext } from 'react-hook-form';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditQuestionMutation } from '../../api/editQuestionApi';
import { EditQuestionFormValues } from '../../model/types/questionEditPageTypes';

export const QuestionEditFormHeader = () => {
	const { t } = useI18nHelpers(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<EditQuestionFormValues>();

	const [editQuestionMutation, { isLoading }] = useEditQuestionMutation();
	const onResetFormValues = () => {
		reset();
	};

	const onEditQuestion = async (data: EditQuestionFormValues) => {
		await editQuestionMutation(data);
	};

	return (
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditQuestion)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
