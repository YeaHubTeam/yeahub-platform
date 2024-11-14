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
