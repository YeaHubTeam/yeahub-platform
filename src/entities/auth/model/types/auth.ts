import { Skill } from '@/entities/skill/@x/auth';
import { SocialNetwork } from '@/entities/socialNetwork/@x/auth';

export interface LoginFormValues {
	username: string;
	password: string;
}

export type SignUpFormValues = Pick<User, 'username' | 'email'> & {
	password: string;
	passwordConfirmation: string;
	isChecked: boolean;
	privacyConsent: boolean;
	offerConsent: boolean;
	adConsent: boolean;
};

export interface FullProfile extends User {
	profiles: Profile[];
	activeProfile: Profile;
}

export interface AuthResponse {
	access_token: string;
	user: User;
}

export interface Profile {
	id: string;
	profileType: number;
	specializationId: number;
	markingWeight: number;
	description: string;
	links: string[];
	socialNetwork: SocialNetwork[];
	image_src: string;
	profileSkills: Skill[];
	isActive: boolean;
}

interface Permission {
	id: string;
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

type SubscriptionState = 'canceled ' | 'active' | 'inactive';

interface Subscription {
	id: string;
	subscriptionId: number;
	userId: string;
	createDate: string;
	endDate?: string;
	state: SubscriptionState;
	subscription: GetSubscriptionResponse;
}

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
	telegramUsername: string | null;
	subscriptions: Subscription[];
	userRoles: Role[];
}

export interface ProfileUpdate extends Profile {
	user: UserUpdate;
}

export interface UserUpdate extends User {
	avatarImage?: string | null;
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

export interface Role {
	id: number;
	name: RoleName;
	permissions: RolePermission[];
}

export interface RolePermission {
	id: number;
	name: string;
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

export type LoginBodyRequest = LoginFormValues;
export type LoginResponse = AuthResponse;

export type SignUpBodyRequest = Omit<SignUpFormValues, 'isChecked'>;
export type SignUpResponse = AuthResponse;

export type RefreshResponse = AuthResponse;
export type ProfileResponse = FullProfile;

export type TelegramLoginBodyRequest = TelegramUser;
export type TelegramLoginResponse = AuthResponse;

export type TelegramLoginError =
	| 'auth.auth.unauthorized'
	| 'auth.telegram.invalid_data'
	| 'auth.telegram.data_outdated'
	| 'user.telegram.already_linked'
	| 'user.telegram.linked_to_another_user'
	| 'auth.telegram.verify_denied'
	| 'user.user.id.not_found';
