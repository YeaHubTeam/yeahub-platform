import { SelectedAdminEntities } from '@/shared/types/types';

export interface SpecializationsPageState {
	page: number;
	selectedSpecializations?: SelectedAdminEntities;
	search?: string;
}
