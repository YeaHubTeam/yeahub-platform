import { RoleName } from '../types/auth';

export const authApiUrls = {
	login: 'auth/login',
	register: 'auth/signUp',
	profile: 'auth/profile',
	logout: 'auth/logout',
	refresh: 'auth/refresh',
	telegram: 'auth/telegram',
	linkTelegram: 'users/link-telegram',
};

export const listAdminRoles: RoleName[] = ['author', 'admin'];
