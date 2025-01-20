import { Collection } from '@/entities/collection';

export interface CollectionCreateFormValues
	extends Pick<Collection, 'title' | 'description' | 'imageSrc' | 'questions'> {
	paidOrFree: 'paid' | 'free';
}
