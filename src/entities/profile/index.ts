import { EmailVerify } from './ui/EmailVerify/EmailVerify';
import { UserVerifyed } from './ui/UserVerifyed/UserVerifyed';

export type { UserState } from './model/types/user';

export { userSlice } from './model/slices/userSlice';

export { userReducer, userActions } from './model/slices/userSlice';

export { getUserIsEmailSent } from './model/selectors/userSelectors';

export { UserVerifyed, EmailVerify };
