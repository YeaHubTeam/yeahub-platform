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
	questionsQuantity?: number;
	keywordsCollection?: string[];
	questions?: Question[];
	specializations?: Specialization[];
	tariff: CollectionTariff;
	isFree?: boolean;
}

export type CreateOrEditCollectionFormValues = Pick<
	Collection,
	'id' | 'title' | 'description' | 'imageSrc'
> & { paidOrFree: 'paid' | 'free'; questions: number[] };

export interface GetCollectionsListParamsRequest {
	page?: number;
	limit?: number;
	search?: string;
	specialization?: number[] | number;
	titleOrDescriptionSearch?: string;
	keywords?: string[];
	isFree?: boolean;
}

export type GetCollectionsListResponse = Response<Collection[]>;

export type GetCollectionByIdResponse = Collection;

export type GetCollectionByIdParamsRequest = {
	collectionId?: string;
};
