import { Response } from '@/shared/libs';

import { Company } from '@/entities/company/@x/collection';
import { Question } from '@/entities/question/@x/collection';
import { Specialization } from '@/entities/specialization/@x/collection';

export type CollectionTariff = 'free' | 'premium';

export interface Collection {
	id: number;
	title: string;
	description: string;
	imageSrc?: string | null;
	createdAt?: string;
	updatedAt?: string;
	questionsCount?: number;
	keywords?: string[];
	questions?: Question[];
	specializations?: Specialization[];
	tariff: CollectionTariff;
	isFree?: boolean;
	company?: Company;
	companyId?: string;
	createdById?: string;
	createdBy?: { id: string; username: string };
	disabled?: boolean;
}

export type CreateOrEditCollectionFormValues = Pick<
	Collection,
	'id' | 'title' | 'description' | 'imageSrc' | 'keywords'
> & {
	isFree: boolean;
	questions: number[];
	specializations: number[];
	companyId?: string;
	collectionImage?: string;
};

export interface GetCollectionsListParamsRequest {
	page?: number;
	limit?: number;
	isFree?: boolean;
	specializations?: number | number[];
	keywords?: string[];
	titleOrDescriptionSearch?: string;
	authorId?: string;
}

export type GetCollectionsListResponse = Response<Collection[]>;

export type GetCollectionByIdResponse = Collection;
export type GetCollectionQuestionsResponse = Response<Question[]>;

export type GetCollectionByIdParamsRequest = {
	collectionId?: string;
	limit?: number;
};

export type GetCollectionKeywordsParamsRequest = {
	page?: number;
	limit?: number;
	title?: string;
};

export type GetCollectionKeywordsResponse = Response<string[]>;
