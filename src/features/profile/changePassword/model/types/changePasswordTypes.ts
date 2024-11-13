interface ChangePasswordDataProps {
	password: string;
	passwordConfirm: string;
	token: string;
}
export interface ChangePasswordParams {
	id: string;
	passwordObject: ChangePasswordDataProps;
}
