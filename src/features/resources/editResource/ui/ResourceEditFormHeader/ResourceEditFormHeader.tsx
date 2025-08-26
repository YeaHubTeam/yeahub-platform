import { useFormContext, type FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { toast } from '@/shared/ui/Toast';

import { useUpdateResourceMutation } from '../../api/editResourceApi';
import { toUpdateResourceBody } from '../../model/lib/map/toUpdateResourceBody';
import type { ResourceEditFormValues } from '../../model/types/resourcesEditTypes';

export const ResourceEditFormHeader = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const navigate = useNavigate();

	const { resourceId, id: idParam } = useParams<{ resourceId?: string; id?: string }>();

	const { handleSubmit, reset, getValues, formState } = useFormContext<ResourceEditFormValues>();
	const [updateResource, { isLoading }] = useUpdateResourceMutation();

	const onCancel = () => {
		reset();
		navigate(-1);
	};

	const onSave = async (values: ResourceEditFormValues) => {
		const id = (values.id || resourceId || idParam || '').toString();

		if (!id) {
			toast.error('No resource id');
			return;
		}

		try {
			const dto = toUpdateResourceBody(values);

			await updateResource({ id, resource: dto }).unwrap();
		} catch (e) {
			toast.error(t(Translation.TOAST_RESOURCE_EDIT_FAILED, { defaultValue: 'Update failed' }));
			// eslint-disable-next-line no-console
			console.error(e);
		}
	};

	const onInvalid = (errors: FieldErrors<ResourceEditFormValues>) => {
		const first = Object.values(errors)[0] as { message?: string } | undefined;
		toast.error(first?.message || t(Translation.VALIDATION_REQUIRED));
		// eslint-disable-next-line no-console
		console.log('Form errors:', errors, 'values:', getValues());
	};

	return (
		<BackHeader>
			<Button disabled={isLoading} onClick={onCancel} variant="secondary">
				{t(Translation.CANCEL)}
			</Button>
			<Button
				disabled={isLoading || formState.isSubmitting}
				onClick={handleSubmit(onSave, onInvalid)}
			>
				{t(Translation.SAVE)}
			</Button>
		</BackHeader>
	);
};
