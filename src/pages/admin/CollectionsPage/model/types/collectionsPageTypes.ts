import { SelectedAdminEntities } from '@/shared/types/types';

export interface CollectionsPageState {
	selectedCollections?: SelectedAdminEntities;
	search: string;
}
