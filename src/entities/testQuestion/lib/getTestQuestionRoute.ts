import { ROUTES } from '@/shared/config';
import { route, Project } from '@/shared/libs';

export const getTestQuestionRoute: Record<Project, (id: string | number) => string> = {
	admin: (id) => route(ROUTES.admin.testQuestions.details.page, id),
	platform: (id) => route(ROUTES.wiki.testQuestions.detail.page, id),
};
