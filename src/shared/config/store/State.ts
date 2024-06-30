// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AuthState } from '@/entities/auth';

import { baseApi } from '../api/baseApi';

export interface State {
	auth: AuthState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
