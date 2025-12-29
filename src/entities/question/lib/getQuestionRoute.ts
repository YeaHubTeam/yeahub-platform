import { ROUTES } from '@/shared/config';
import { route, Project } from '@/shared/libs';

export const getQuestionRoute: Record<Project, (id: string | number) => string> = {
	admin: (id) => route(ROUTES.admin.questions.details.page, id),
	platform: (id) => route(ROUTES.wiki.questions.detail.page, id),
	landing: (id) => route(ROUTES.questions.detail.page, id),
};
