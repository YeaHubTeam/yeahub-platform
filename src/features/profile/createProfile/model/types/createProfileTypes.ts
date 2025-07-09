import { Profile } from '@/entities/auth';

export type CreateProfileRequestData = Pick<
	Profile,
	'profileType' | 'specializationId' | 'markingWeight'
> & {
	userId: string;
};
