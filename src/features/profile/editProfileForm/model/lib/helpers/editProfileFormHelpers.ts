import { FullProfile } from '@/entities/auth';
import { SocialNetwork, socialNetworks } from '@/entities/socialNetwork';

import { EditProfileRequestData, ProfileSchema } from '../../types/editProfileTypes';

export const mapProfileToForm = (profile: FullProfile): ProfileSchema => ({
	username: profile.username,
	specialization: profile.activeProfile.specializationId,
	email: profile.email,
	location: profile.city,
	socialNetworks: socialNetworks.reduce((result: SocialNetwork[], socialNetwork) => {
		const currentSocialNetwork = profile.activeProfile.socialNetwork?.find(
			({ code }) => code === socialNetwork.code,
		);
		result.push({
			code: socialNetwork.code,
			title: currentSocialNetwork?.title || '',
		});
		return result;
	}, []),
	aboutMe: profile.activeProfile.description,
	skills: profile.activeProfile.profileSkills.map((skill) => skill.id),
});

export const mapFormToProfile = (
	profile: FullProfile,
	values: ProfileSchema,
): EditProfileRequestData => ({
	...profile.activeProfile,
	id: profile.activeProfile.id,
	specializationId: values.specialization,
	description: values.aboutMe || '',
	socialNetwork: values.socialNetworks
		? values.socialNetworks.filter((socialNetwork) => socialNetwork.title)
		: [],
	profileSkills: values.skills || [],
	user: {
		...profile,
		id: profile.id,
		email: values.email || '',
		username: values.username,
		city: values.location || profile.city || '',
		birthday: profile.birthday || null,
		address: profile.address || '',
		avatarUrl: profile.avatarUrl || '',
		avatarImage: values.image,
	},
});
