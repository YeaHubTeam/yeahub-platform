import { Response } from '@/shared/types/types';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Question } from '@/entities/question';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

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
}

export type CreateOrEditCollectionFormValues = Pick<
	Collection,
	'id' | 'title' | 'description' | 'imageSrc' | 'keywords'
> & {
	isFree: boolean;
	questions: number[];
	specializations: number[];
	createdBy?: string;
	collectionImage?: string;
};

export interface GetCollectionsListParamsRequest {
	page?: number;
	limit?: number;
	search?: string;
	specialization?: number[] | number;
	isFree?: boolean;
}

export type GetCollectionsListResponse = Response<Collection[]>;

export type GetCollectionByIdResponse = Collection;
export type GetCollectionQuestionsResponse = Response<Question[]>;

export type GetCollectionByIdParamsRequest = {
	collectionId?: string;
};
