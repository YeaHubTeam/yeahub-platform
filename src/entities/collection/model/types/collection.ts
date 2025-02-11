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
	questions: Question[];
	specializations: Specialization[];
	tariff: CollectionTariff;
}

export type CreateOrEditCollectionFormValues = Pick<
	Collection,
	'id' | 'title' | 'description' | 'imageSrc' | 'keywordsCollection'
> & {
	paidOrFree: 'paid' | 'free';
	questions: number[];
	specializations: number[];
};

export interface GetCollectionsListParamsRequest {
	page?: number;
	limit?: number;
}

export type GetCollectionsListResponse = Response<Collection[]>;
