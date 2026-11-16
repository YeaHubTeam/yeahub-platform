import { Response } from '@/shared/libs';
import { Author } from '@/shared/ui/AuthorInfo';

export interface Company {
	id: string;
	title: string;
	legalName?: string;
	description?: string;
	imageSrc?: string;
	inn?: string;
	kpp?: string;
	createdAt: string;
	updatedAt: string;
	createdBy: Author;
}

export type GetCompaniesListResponse = Response<Company[]>;

export interface GetCompaniesListParamsRequest {
	limit?: number;
	page?: number;
	titleOrLegalNameOrDescriptionSearch?: string;
	authorId?: string;
}
