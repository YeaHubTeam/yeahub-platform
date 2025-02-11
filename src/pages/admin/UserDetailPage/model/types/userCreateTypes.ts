import { CreateOrEditUserFormValues, User } from '@/entities/user';

export type UserFormValues = Omit<CreateOrEditUserFormValues, 'id'>;

export type CreateUserResponse = User;
