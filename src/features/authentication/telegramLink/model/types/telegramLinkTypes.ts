type SubscriptionState = 'canceled ' | 'active' | 'inactive';

interface Permission {
	id: string;
	name: string;
}

export interface RolePermission {
	id: number;
	name: string;
}

interface RoleSubscription {
	id: string;
	name: string;
	permissions: Permission[];
}

interface GetSubscriptionResponse {
	id: string;
	name: string;
	pricePerMonth: number;
	description?: string;
	roles: RoleSubscription[];
}

interface Subscription {
	id: string;
	subscriptionId: number;
	userId: string;
	createDate: string;
	endDate?: string;
	state: SubscriptionState;
	subscription: GetSubscriptionResponse;
}
export interface Role {
	id: number;
	name: RoleName;
	permissions: RolePermission[];
}
export type RoleName =
	| 'guest'
	| 'candidate'
	| 'member'
	| 'admin'
	| 'HR'
	| 'candidate-free'
	| 'candidate-premium'
	| 'author';

export interface User {
	id: string;
	username: string;
	country: string;
	city: string;
	email: string;
	birthday: string | null;
	address: string;
	avatarUrl: string;
	createdAt: string;
	updatedAt: string;
	isVerified?: boolean;
	subscriptions: Subscription[];
	userRoles: Role[];
}

export interface AuthResponse {
	access_token: string;
	user: User;
}

export interface TelegramUser {
	id: number;
	first_name: string;
	auth_date: number;
	hash: string;
	last_name?: string;
	username?: string;
	photo_url?: string;
}

export type TelegramLoginBodyRequest = TelegramUser;
export type TelegramLoginResponse = AuthResponse;
