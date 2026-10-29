import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useCreateArticleMutation } from '../../api/createArticleApi';
import { CreateArticleFormValues } from '../../model/types/articleCreateTypes';

import styles from './ArticleCreateFormHeader.module.css';

export const ArticleCreateFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit } = useFormContext<CreateArticleFormValues>();

	const [createArticleMutation, { isLoading }] = useCreateArticleMutation();

	const onCreateArticle = async (data: CreateArticleFormValues) => {
		await createArticleMutation(data);
	};

	return (
		<BackHeader className={styles['back-header']}>
			<FormCancelButton />
			<Button
				size="large"
				className={styles['btn']}
				disabled={isLoading}
				onClick={handleSubmit(onCreateArticle)}
			>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
