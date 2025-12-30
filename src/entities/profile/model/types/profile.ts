import { FullProfile } from '@/entities/auth/@x/profile';

export interface ProfileState {
	isEmailSent: boolean;
	fullProfile: FullProfile | null;
	isEdit: boolean;
}
