import { CreateOrEditUserFormValues, User } from '@/entities/user';

export type CreateUserFormValues = Omit<CreateOrEditUserFormValues, 'id'>;

export type CreateUserBodyRequest = CreateUserFormValues;
export type CreateUserResponse = User;
