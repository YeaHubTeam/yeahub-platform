import { TFunction } from 'i18next';
import * as yup from 'yup';

import { createChangePasswordSchema } from '../../lib/validation/changePasswordSchema';

const tempSchema = createChangePasswordSchema(((key: string) => key) as TFunction);

export type ChangePasswordSchema = yup.InferType<typeof tempSchema>;

export interface ChangePasswordFormValues {
	password: string;
	passwordConfirm: string;
}

export interface ChangePasswordBodyRequest extends ChangePasswordFormValues {
	token: string;
}

export interface ChangePasswordRequest {
	id: string;
	passwordObject: ChangePasswordBodyRequest;
}
