import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { SelectedAdminEntities } from '@/shared/types/types';
import { toast } from '@/shared/ui/Toast';

import { deleteSpecializationsApi } from '../../api/deleteSpecializationsApi';

export const deleteMultipleSpecializationsThunk = createAsyncThunk<void, SelectedAdminEntities>(
	'specializations/deleteMultiple',
	async (specializations, { rejectWithValue, dispatch }) => {
		try {
			const responses = await Promise.allSettled(
				specializations.map(
					async (specialization) =>
						await dispatch(
							deleteSpecializationsApi.endpoints.deleteSpecializationOfMultiply.initiate(
								specialization.id,
							),
						),
				),
			);

			dispatch(
				baseApi.util.invalidateTags([ApiTags.SPECIALIZATIONS, ApiTags.SPECIALIZATION_DETAIL]),
			);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const successfulDeletions = responses.filter((response: any) => !response.value.error);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const failedDeletions = responses.filter((response: any) => !!response.value.error);

			if (failedDeletions.length === 1 && successfulDeletions.length === 0) {
				toast.error(i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_FAILED));
				return;
			}

			if (successfulDeletions.length === 1 && failedDeletions.length === 0) {
				toast.success(`${i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_SINGLE_SUCCESS)}`);
				return;
			}

			if (successfulDeletions.length >= 1) {
				toast.success(
					`${i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_MULTIPLE_SUCCESS)} ${successfulDeletions.length}`,
				);
			}

			if (failedDeletions.length > 0) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				failedDeletions.forEach((_: any, index: number) => {
					toast.error(
						`${i18n.t(Translation.TOAST_SPECIALIZATIONS_DELETE_MULTIPLE_FAILED)} ${specializations[index].title}`,
					);
				});
			}
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
		}
	},
);
