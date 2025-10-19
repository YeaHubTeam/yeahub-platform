import { ROUTES } from '@/shared/config/router/routes';

export const isPathMatch = (route: string, currentPathname: string): boolean => {
	const platformRoute = `${ROUTES.platformRoute}/${route}`;
	const adminRoute = `${ROUTES.adminRoute}/${route}`;

	console.log(currentPathname);
	console.log(route);
	console.log(platformRoute);
	console.log(adminRoute);
	return [platformRoute, adminRoute].some((path) => currentPathname.includes(path));
};
