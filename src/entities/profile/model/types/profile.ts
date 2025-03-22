// eslint-disable-next-line @conarti/feature-sliced/layers-slices, prettier/prettier
import { FullProfile } from '@/entities/auth';

export interface ProfileState {
	isEmailSent: boolean;
	fullProfile: FullProfile | null;
	isEdit: boolean;
}
