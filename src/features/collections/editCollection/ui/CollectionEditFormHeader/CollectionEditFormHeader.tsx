import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditCollectionMutation } from '../../api/editCollectionApi';
import { CollectionEditFormValues } from '../../model/types/collectionEditTypes';

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
		await editCollectionMutation(data);
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
