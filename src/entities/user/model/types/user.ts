import { Response } from '@/shared/types/types';

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
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	country: string;
	city: string;
	address: string;
	avatarUrl: string;
	birthday: string;
	updatedAt: string;
	createdAt: string;
	userRoles: UserRole[];
	isEmailVerified?: boolean;
}

export interface UserRolesMutationRequest {
	userId: string;
	roles: number[];
}

export type CreateOrEditUserFormValues = Pick<
	User,
	'id' | 'firstName' | 'lastName' | 'phone' | 'email' | 'country' | 'city' | 'address' | 'birthday'
> & {
	userRoles: number[];
	status?: UserStatus;
};

export type GetUsersListParamsRequest = {
	page?: number;
	search?: string;
	limit?: number;
};

export type GetUsersListResponse = Response<User[]>;

export type GetUserByIdResponse = User;

export type UserFormValues = Omit<CreateOrEditUserFormValues, 'id'>;
