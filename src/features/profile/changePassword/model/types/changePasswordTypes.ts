import * as yup from 'yup';

import { createChangePasswordSchema } from '../../lib/validation/changePasswordSchema';

export type ChangePasswordSchema = yup.InferType<ReturnType<typeof createChangePasswordSchema>>;

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
