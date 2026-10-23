import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditArticleMutation } from '../../api/editArticleApi';
import { EditArticleFormValues } from '../../model/types/articleEditTypes';

export const ArticleEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<EditArticleFormValues>();

	const [editArticleMutation, { isLoading }] = useEditArticleMutation();
	const onResetFormValues = () => {
		reset();
	};

	const onEditArticle = async (data: EditArticleFormValues) => {
		await editArticleMutation(data);
	};

	return (
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditArticle)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
