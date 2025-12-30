import { Response } from '@/shared/libs';

import { FullProfile } from '@/entities/auth/@x/user';

export type UserStatus = 'public' | 'draft';

export interface Permission {
	id: number;
	name: string;
}

export type RoleName =
	| 'guest'
	| 'candidate'
	| 'member'
	| 'admin'
	| 'HR'
	| 'author'
	| 'candidate-free'
	| 'candidate-premium';

export interface UserRole {
	id: number;
	name: RoleName;
	permissions: Permission[];
}

export type GetUserRolesListResponse = UserRole[];

export interface User {
	id: string;
	username: string;
	email: string;
	country: string;
	city: string;
	address: string;
	avatarUrl: string;
	birthday: string;
	updatedAt: string;
	createdAt: string;
	userRoles: UserRole[];
	isVerified?: boolean;
	telegramUsername: string | null;
	profiles?: FullProfile;
}

export interface UserRolesMutationRequest {
	userId: string;
	roles: number[];
}

export type CreateOrEditUserFormValues = Pick<
	User,
	'id' | 'username' | 'email' | 'country' | 'city' | 'address' | 'birthday'
> & {
	userRoles: number[];
	status?: UserStatus;
};

export type GetUsersListParamsRequest = {
	page?: number;
	search?: string;
	isVerified?: boolean;
	roles?: number[];
	limit?: number;
};

export type GetUsersListResponse = Response<User[]>;

export type GetUserByIdResponse = User;

export type GetUserProfileByIdResponse = FullProfile;

export type UserFormValues = Omit<CreateOrEditUserFormValues, 'id'>;
