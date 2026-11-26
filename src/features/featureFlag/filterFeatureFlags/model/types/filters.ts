import type { ClientType } from '@/entities/featureFlag';

export interface FeatureFlagsFilterParams {
	page?: number;
	search?: string;
	roleIds?: number[];
	clientType?: ClientType;
	enabled?: boolean;
}
