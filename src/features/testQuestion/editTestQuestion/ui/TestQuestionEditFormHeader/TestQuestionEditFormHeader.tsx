import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditTestQuestionMutation } from '../../api/editTestQuestionApi';
import { EditTestQuestionFormValues } from '../../model/types/testQuestionEditTypes';

export const TestQuestionEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<EditTestQuestionFormValues>();
	const [editTestQuestionMutation, { isLoading }] = useEditTestQuestionMutation();

	const onResetFormValues = () => {
		reset();
	};

	const onEditTestQuestion = async (data: EditTestQuestionFormValues) => {
		await editTestQuestionMutation(data);
	};

	return (
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditTestQuestion)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
