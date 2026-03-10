import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// ВНИМАНИЕ: Проверь точный путь до ApiErrorData в вашем проекте!

import { i18Namespace, Translation } from '@/shared/config';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { toast } from '@/shared/ui/Toast';

import { useEditSpecializationMutation } from '../../api/editSpecializationApi';
import { EditSpecializationFormValues } from '../../model/types/specializationEditPageTypes';

// Строгая типизация возможных ключей ошибок из твоего Swagger

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

			// Если в i18n есть специальный ключ для успеха, лучше использовать его.

			// Пока оставляем базовый SUCCESS из общих переводов.

			toast.success(t(Translation.SUCCESS, { ns: 'translation' }));
		} catch (err) {
			const rtkError = err as FetchBaseQueryError;

			// Проверяем, что сервер вернул ожидаемый формат ошибки

			if (rtkError.data && typeof rtkError.data === 'object' && 'statusCode' in rtkError.data) {
				const apiError = rtkError.data as ApiErrorData<EditSpecializationErrorType>;

				if (apiError.statusCode === 409) {
					// 409 Conflict: Подсвечиваем инпут и отдаем ключ ошибки в i18n

					setError('title', {
						type: 'server',

						message: t(apiError.message),
					});
				} else {
					// Остальные ошибки (500, 404, 401) показываем глобальным тостом, тоже переводя по ключу

					toast.error(t(apiError.message));
				}
			} else {
				// Если нет интернета или бэкенд упал с критической ошибкой без JSON

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
