// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SocialNetwork } from '@/entities/socialNetwork';

export interface Auth {
	username: string;
	password: string;
}

export interface SignUp {
	firstName: string;
	lastName: string;
	password: string;
	phone: string;
	email: string;
	country: string | null;
	city: string | null;
	birthday: string | null;
	address: string | null;
	avatarUrl: string | null;
}

export interface GetProfileResponse extends Omit<SignUp, 'password'> {
	id: string;
	updatedAt: string;
	createdAt: string;
	address: string;
	avatarUrl: string;
	birthday: string | null;
	city: string;
	country: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	profiles: Profile[];
	refreshToken: string;
	passwordHash: string;
	userRoles: [];
	avatarImage?: FileList;
}

export interface GetAuthResponse {
	access_token: string;
	user: GetProfileResponse;
}

export interface Profile {
	description: string;
	id: string;
	image_src: string;
	links: string[];
	markingWeight: number;
	userId: string;
	profileSkills: Skill[];
	profileType: number;
	socialNetwork: SocialNetwork[];
	specializationId: number;
}

export interface ExtraArgument {
	navigate: (path: string) => void;
}
