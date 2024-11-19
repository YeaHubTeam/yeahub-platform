import { SelectedAdminEntities } from '@/shared/types/types';

export interface SkillsPageState {
	page: number;
	selectedSkills?: SelectedAdminEntities;
	search?: string;
}
