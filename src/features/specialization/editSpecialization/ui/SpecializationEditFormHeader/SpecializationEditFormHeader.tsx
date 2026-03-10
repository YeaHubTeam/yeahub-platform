import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { toast } from '@/shared/ui/Toast';

import { useEditSpecializationMutation } from '../../api/editSpecializationApi';
import { EditSpecializationFormValues } from '../../model/types/specializationEditPageTypes';

export type EditSpecializationErrorType =
	| 'specialization.specialization.title.conflict'
	| 'specialization.specialization.not_found'
	| 'tinify.tinify.compress_failed'
	| 'tinify.tinify.resize_failed'
	| 'auth.auth.unauthorized'
	| 'auth.user.verified';

export const SpecializationEditFormHeader = () => {
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.translation]);

	const { handleSubmit, reset, setError } = useFormContext<EditSpecializationFormValues>();

	const [editSpecializationMutation, { isLoading }] = useEditSpecializationMutation();

	const onResetFormValues = () => {
		reset();
	};

	const onEditSpecialization = async (data: EditSpecializationFormValues) => {
		try {
			await editSpecializationMutation(data).unwrap();

			toast.success(t(Translation.SUCCESS, { ns: 'translation' }));
		} catch (err) {
			const rtkError = err as FetchBaseQueryError;

			if (rtkError.data && typeof rtkError.data === 'object' && 'statusCode' in rtkError.data) {
				const apiError = rtkError.data as ApiErrorData<EditSpecializationErrorType>;

				if (apiError.statusCode === 409) {
					setError('title', {
						type: 'server',

						message: t(apiError.message),
					});
				} else {
					toast.error(t(apiError.message));
				}
			} else {
				toast.error(t(Translation.ERROR, { ns: 'translation' }));
			}
		}
	};

	return (
		<BackHeader>
			<Button disabled={isLoading} onClick={onResetFormValues} variant="secondary">
				{t(Translation.CANCEL, { ns: 'translation' })}
			</Button>

			<Button disabled={isLoading} onClick={handleSubmit(onEditSpecialization)}>
				{t(Translation.SAVE, { ns: 'translation' })}
			</Button>
		</BackHeader>
	);
};
