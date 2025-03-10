import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { CollectionEditFormValues } from '@/features/collections/editCollection/model/types/collectionEditTypes';

import { useEditCollectionMutation } from '../../api/editCollectionApi';

export const CollectionEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<CollectionEditFormValues>();

	const navigate = useNavigate();
	const [editCollectionMutation, { isLoading }] = useEditCollectionMutation();

	const onResetFormValues = () => {
		reset();
		navigate(-1);
	};

	const onEditCollection = async (data: CollectionEditFormValues) => {
		const {
			id,
			description,
			imageSrc,
			isFree,
			keywords,
			questions,
			specializations,
			title,
			collectionImage,
		} = data;
		const requestData = {
			id,
			description,
			imageSrc,
			isFree,
			keywords,
			questions,
			specializations,
			title,
			collectionImage,
		};
		await editCollectionMutation(requestData);
	};

	return (
		<BackHeader>
			<Button disabled={isLoading} onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading} onClick={handleSubmit(onEditCollection)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
