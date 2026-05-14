import { CreateOrEditFeatureFlagFormValues, FeatureFlagApiItem } from '@/entities/featureFlag';

export type CreateFeatureFlagFormValues = Omit<CreateOrEditFeatureFlagFormValues, 'id'>;

export type CreateFeatureFlagBodyRequest = CreateFeatureFlagFormValues;
export type CreateFeatureFlagResponse = FeatureFlagApiItem;
