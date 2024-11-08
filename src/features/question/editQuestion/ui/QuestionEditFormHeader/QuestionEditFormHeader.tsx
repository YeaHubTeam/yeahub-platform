import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditQuestionMutation } from '../../api/editQuestionApi';
import { QuestionEditFormValues } from '../../model/types/questionEditPageTypes';

export const QuestionEditFormHeader = () => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<QuestionEditFormValues>();

	const [editQuestionMutation, { isLoading, isSuccess }] = useEditQuestionMutation();
	const onResetFormValues = () => {
		reset();
	};

	const onEditQuestion = async (data: QuestionEditFormValues) => {
		await editQuestionMutation(data);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate(-1);
		}
	}, [navigate, isSuccess]);

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
