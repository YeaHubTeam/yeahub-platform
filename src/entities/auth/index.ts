export type { Auth, SignUp, GetProfileResponse, ExtraArgument } from './model/types/auth';
export {
	useLoginMutation,
	useRegisterMutation,
	useProfileQuery,
	useLazyLogoutQuery,
	useLazyRefreshQuery,
} from './api/authApi';
