import { RoleName } from '../types/auth';

export const authApiUrls = {
	login: 'auth/login',
	register: 'auth/signUp',
	profile: 'auth/profile',
	logout: 'auth/logout',
	refresh: 'auth/refresh',
	telegram: 'auth/telegram',
};

export const listAdminRoles: RoleName[] = ['author', 'admin'];

export const ROLE_ID_TO_NAME: Record<number, RoleName> = {
	1: 'guest',
	2: 'candidate',
	3: 'member',
	4: 'admin',
	5: 'HR',
	6: 'candidate-free',
	7: 'candidate-premium',
	8: 'author',
};
