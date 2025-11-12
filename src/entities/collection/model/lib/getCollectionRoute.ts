import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Project } from '@/shared/hooks/useCurrentProject';

export const getCollectionRoute: Record<Project, (id: string | number) => string> = {
	admin: (id) => route(ROUTES.admin.collections.details.page, id),
	platform: (id) => route(ROUTES.interview.collections.detail.page, id),
	landing: (id) => route(ROUTES.collections.detail.page, id),
};
