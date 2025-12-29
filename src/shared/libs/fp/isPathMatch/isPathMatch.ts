import { ROUTES } from '../../../config/router';

export const isPathMatch = (route: string, currentPathname: string): boolean => {
	const platformRoute = `${ROUTES.platformRoute}/${route}`;
	const adminRoute = `${ROUTES.adminRoute}/${route}`;

	return [platformRoute, adminRoute].some((path) => currentPathname.includes(path));
};
