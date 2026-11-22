import { createAsyncThunk } from '@reduxjs/toolkit';

import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteCompaniesApi } from '../../api/deleteCompaniesApi';

export const deleteMultipleCompaniesThunk = createAsyncThunk<void, SelectedAdminEntities<string>>(
	'companies/deleteMultiple',
	async (companies, { rejectWithValue, dispatch }) => {
		try {
			const results = await Promise.allSettled(
				companies.map(async (company) => {
					const response = await dispatch(
						deleteCompaniesApi.endpoints.deleteCompanyOfMultiply.initiate(company.id),
					);

					return { company, error: response.error };
				}),
			);

			dispatch(baseApi.util.invalidateTags([ApiTags.COMPANIES]));

			const successfulDeletions = results.filter(
				(result) => result.status === 'fulfilled' && !result.value.error,
			);
			const failedDeletions = results.filter(
				(result) =>
					result.status === 'rejected' || (result.status === 'fulfilled' && !!result.value.error),
			);

			if (failedDeletions.length === 1 && successfulDeletions.length === 0) {
				toast.error(i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_FAILED));
				return;
			}

			if (failedDeletions.length > 0) {
				failedDeletions.forEach((result) => {
					const title = result.status === 'fulfilled' ? result.value.company.title : '';

					toast.error(`${i18n.t(Translation.TOAST_COMPANIES_DELETE_MULTIPLE_FAILED)} ${title}`);
				});
			}

			if (successfulDeletions.length === 1 && failedDeletions.length === 0) {
				toast.success(`${i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_SUCCESS)}`);
				return;
			}

			if (successfulDeletions.length >= 1) {
				toast.success(
					`${i18n.t(Translation.TOAST_COMPANIES_DELETE_MULTIPLE_SUCCESS)} ${successfulDeletions.length}`,
				);
			}
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
		}
	},
);
