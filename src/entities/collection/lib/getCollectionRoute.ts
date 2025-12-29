import { ROUTES } from '@/shared/config';
import { route, Project } from '@/shared/libs';

export const getCollectionRoute: Record<Project, (id: string | number) => string> = {
	admin: (id) => route(ROUTES.admin.collections.details.page, id),
	platform: (id) => route(ROUTES.wiki.collections.detail.page, id),
	landing: (id) => route(ROUTES.collections.detail.page, id),
};
