import { ClientType } from '@/entities/featureFlag';

export interface FeatureFlagFiltersParams {
	page?: number;
	limit?: number;
	search?: string;
	enabled?: boolean;
	clientType?: ClientType;
	selectedRoles?: number[];
}
