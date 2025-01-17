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
	questions: Question[];
	specializations: Specialization[];
	tariff: CollectionTariff;
}

export interface DeveloperSpecialization {
	id?: number;
	title?: string;
	imageSrc?: string | null;
}

export type GetCollectionsListResponse = Response<Collection[]>;
export type GetCollectionByIdResponse = Collection;

export interface GetCollectionsListParamsRequest {
	page?: number;
	limit?: number;
	title?: string;
}

export type GetCollectionByIdParamsRequest = {
	collectionId: string;
};
