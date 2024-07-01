// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AuthState } from '@/entities/auth';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { QuestionsPageState } from '@/pages/QuestionsPage';

import { baseApi } from '../api/baseApi';

export interface State {
	auth: AuthState;
	questionsPage: QuestionsPageState;
	[baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
