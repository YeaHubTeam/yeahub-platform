import { RoleName } from '../types/auth';

export const authApiUrls = {
	login: 'auth/login',
	register: 'auth/signUp',
	profile: 'auth/profileInfo',
	logout: 'auth/logout',
	refresh: 'auth/refresh',
	telegram: 'auth/telegram',
};

export const listAdminRoles: RoleName[] = ['author', 'admin'];
