import { ApiTags } from '@/shared/config/api/apiTags';
import { baseApi } from '@/shared/config/api/baseApi';
import { Response, SortOrder } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

export interface ExternalProduct {
	id: string | number;
	name: string;
	description: string;
	type: {
		code: string;
		description: string;
	};
	url: string;
	keywords: string[];
	specializations: Specialization[];
	skills: Skill[];
	createdById: string;
	createdAt: string;
	updatedAt: string;
}

export interface GetExternalProductsListParamsRequest {
	name?: string;
	types?: string[];
	authorId?: string;
	specializations?: number[];
	skills?: number[];
	keywords?: string[];
	page?: number;
	limit?: number;
	orderBy?: string;
	order?: SortOrder;
	random?: boolean;
}

export type GetExternalProductsListResponse = Response<ExternalProduct[]>;

export const externalProductApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getExternalProductsList: build.query<
			GetExternalProductsListResponse,
			GetExternalProductsListParamsRequest
		>({
			query: (params) => ({
				url: 'external-products/product',
				params: { page: 1, limit: 10, ...params },
			}),
			providesTags: [ApiTags.EXTERNAL_PRODUCTS],
		}),
	}),
});

export const { useGetExternalProductsListQuery } = externalProductApi;
