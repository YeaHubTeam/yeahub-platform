import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { FormCancelButton } from '@/shared/ui/FormCancelButton';

import { useEditCollectionMutation } from '../../api/editCollectionApi';
import { CollectionEditFormValues } from '../../model/types/collectionEditTypes';

export const CollectionEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit } = useFormContext<CollectionEditFormValues>();

	const [editCollectionMutation, { isLoading }] = useEditCollectionMutation();

	const onEditCollection = async (data: CollectionEditFormValues) => {
		await editCollectionMutation(data);
	};

	return (
		<BackHeader>
			<FormCancelButton disabled={isLoading} />
			<Button disabled={isLoading} onClick={handleSubmit(onEditCollection)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
