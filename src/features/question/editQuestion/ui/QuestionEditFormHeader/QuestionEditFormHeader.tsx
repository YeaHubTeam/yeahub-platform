import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useEditQuestionMutation } from '../../api/editQuestionApi';
import { EditQuestionFormValues } from '../../model/types/questionEditPageTypes';

export const QuestionEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit } = useFormContext<EditQuestionFormValues>();

	const [editQuestionMutation, { isLoading }] = useEditQuestionMutation();

	const onEditQuestion = async (data: EditQuestionFormValues) => {
		await editQuestionMutation(data);
	};

	return (
		<BackHeader>
			<FormCancelButton disabled={isLoading} />
			<Button disabled={isLoading} onClick={handleSubmit(onEditQuestion)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
