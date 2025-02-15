import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { CollectionEditFormValues } from '@/features/collections/editCollection/model/types/collectionEditTypes';

export const CollectionEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { handleSubmit, reset } = useFormContext<CollectionEditFormValues>();

	const navigate = useNavigate();

	const onResetFormValues = () => {
		reset();
		navigate(-1);
	};

	const onEditCollection = (data: CollectionEditFormValues) => {
		console.log('!!!!Данные успешно сохранены!!!!!', data);
	};

	return (
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button onClick={handleSubmit(onEditCollection)}>{t(Translation.SAVE)}</Button>
		</BackHeader>
	);
};
