import * as yup from 'yup';

import { ProfileUpdate } from '@/entities/auth';
import { SocialNetwork } from '@/entities/socialNetwork';

import { editProfileSchema } from '../lib/validation/editProfileSchema';

export type ProfileSchema = yup.InferType<typeof editProfileSchema>;

/**
 * Interface representing personal information of a user.
 *
 * @param image        - Optional. URL of the user's profile image.
 * @param name         - Required. The user's name and last name, e.g., Aleksey Narodny.
 * @param specialization - Required. The user's specialization, e.g., "Web Developer" or "Graphic Designer."
 * @param email        - Required. The user's email address.
 * @param location     - Optional. The user's location, e.g., "Moscow, Russia." (optional)
 * @param skillLevel   - Optional. The user's skill level, e.g., "Junior," "Mid," "Senior." (optional)
 * @param socialNerworks  - Optional. Links to the user's social media profiles. (optional)
 *  @param aboutMe      - Optional. A short biography or information about the user. (optional)
 * @param skills       - Optional. A list of the user's skills. (optional)
 */
//TODO: Согласовать с беком поля под Образование, Опыт Работы, Проекты, потом добавить в UserInfoProfile
export interface EditProfileValues {
	image?: FileList;
	name: string;
	username: string;
	specialization: string;
	email: string;
	location?: string;
	skillLevel?: string;
	socialNetworks?: SocialNetwork[];
	aboutMe?: string;
	skills?: string[];
}

export interface EditUserValue {
	username: string;
	country: string;
	city: string;
	birthday: string | null;
	address: string;
	avatarUrl: string;
	avatarImage?: string | null;
}

export type EditProfileRequestData = Omit<ProfileUpdate, 'profileSkills'> & {
	profileSkills: number[];
};

export type EditUserRequestData = {
	id: string;
	userInfo: EditUserValue;
};

export type EditAvatarRequestData = {
	id: string;
	image: string | null;
	oldImage: string;
};
