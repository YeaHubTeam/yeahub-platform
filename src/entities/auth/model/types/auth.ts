// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SocialNetwork } from '@/entities/socialNetwork';

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
	isEmailVerified?: boolean;
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
	| 'hr'
	| 'candidate-free'
	| 'candidate-premium';

export interface Role {
	id: number;
	name: RoleName;
	permissions: RolePermission[];
}

export interface RolePermission {
	id: number;
	name: string;
}

export type LoginBodyRequest = LoginFormValues;
export type LoginResponse = AuthResponse;

export type SignUpBodyRequest = Omit<SignUpFormValues, 'isChecked'>;
export type SignUpResponse = AuthResponse;

export type RefreshResponse = AuthResponse;
export type ProfileResponse = FullProfile;
