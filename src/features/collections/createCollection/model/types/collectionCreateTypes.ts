import { CreateOrEditCollectionFormValues } from '@/entities/collection';

export type CollectionCreateFormValues = Omit<CreateOrEditCollectionFormValues, 'id'>;
