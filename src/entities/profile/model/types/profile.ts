// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Skill } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SocialNetwork } from '@/entities/socialNetwork';

export interface User {
	address: string;
	avatarUrl: string;
	birthday: string | null;
	city: string;
	country: string;
	createdAt: string;
	email: string;
	firstName: string;
	id: string;
	lastName: string;
	passwordHash: string;
	phone: string;
	refreshToken: string;
	updatedAt: string;
	userRoles: string[];
	avatarImage?: FileList;
}

export interface Profile {
	id: string;
	userId: string;
	profileType: number;
	specializationId: number;
	markingWeight: number;
	description: string;
	links: string[];
	image_src: string;
	profileSkills: Skill[];
	socialNetwork: SocialNetwork[];
	user: User;
}
