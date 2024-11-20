// eslint-disable-next-line @conarti/feature-sliced/public-api, @conarti/feature-sliced/layers-slices
import { ProfileResponse } from '@/entities/auth/model/types/auth';

export interface ProfileState {
	isEmailSent: boolean;
	fullProfile: ProfileResponse | null;
}
