import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Project } from '@/shared/hooks/useCurrentProject';

export const getQuestionRoute: Record<Project, (id: string | number) => string> = {
	admin: (id) => route(ROUTES.admin.questions.details.page, id),
	platform: (id) => route(ROUTES.interview.questions.detail.page, id),
	landing: (id) => route(ROUTES.questions.detail.page, id),
};
