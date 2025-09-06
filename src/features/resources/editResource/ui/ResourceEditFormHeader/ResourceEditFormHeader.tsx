import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useEditResourceMutation } from '../../api/editResourceApi';
import { EditResourceFormValues } from '../../model/types/resourcesEditTypes';

export const ResourceEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleSubmit, reset, formState } = useFormContext<EditResourceFormValues>();
	const [editResourceMutation, { isLoading }] = useEditResourceMutation();
	const onResetFormValues = () => {
		reset();
	};

	const onEditResource = async (data: EditResourceFormValues) => {
		editResourceMutation(data);
	};

	return (
		<BackHeader>
			<Button onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button disabled={isLoading || formState.isSubmitting} onClick={handleSubmit(onEditResource)}>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
