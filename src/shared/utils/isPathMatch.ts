import { ROUTES } from '@/shared/config/router/routes';

export const isPathMatch = (route: string, currentPathname: string): boolean => {
	const platformRoute = `${ROUTES.platformRoute}/${route}`;
	const adminRoute = `${ROUTES.adminRoute}/${route}`;

	return [platformRoute, adminRoute].some((path) => currentPathname.startsWith(path));
};
