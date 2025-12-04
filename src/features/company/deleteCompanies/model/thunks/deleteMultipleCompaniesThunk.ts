import { createAsyncThunk } from '@reduxjs/toolkit';

import { i18n, Translation, ApiTags, baseApi } from '@/shared/config';
import { SelectedAdminEntities } from '@/shared/libs';
import { toast } from '@/shared/ui/Toast';

import { deleteCompaniesApi } from '../../api/deleteCompaniesApi';

export const deleteMultipleCompaniesThunk = createAsyncThunk<void, SelectedAdminEntities>(
	'companies/deleteMultiple',
	async (companies, { rejectWithValue, dispatch }) => {
		try {
			const responses = await Promise.allSettled(
				companies.map(
					async (company) =>
						await dispatch(
							deleteCompaniesApi.endpoints.deleteCompanyOfMultiply.initiate(company.id),
						),
				),
			);
			dispatch(baseApi.util.invalidateTags([ApiTags.COMPANIES, ApiTags.COMPANY_DETAIL]));

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const successfulDeletions = responses.filter((response: any) => !response.value.error);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const failedDeletions = responses.filter((response: any) => !!response.value.error);

			if (failedDeletions.length === 1 && successfulDeletions.length === 0) {
				toast.error(i18n.t(Translation.TOAST_COMPANIES_DELETE_SINGLE_FAILED));
				return;
			}

			if (failedDeletions.length > 0) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				failedDeletions.forEach((_: any, index: number) => {
					toast.error(
						`${i18n.t(Translation.TOAST_COMPANIES_DELETE_MULTIPLE_FAILED)} ${companies[index].title}`,
					);
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
