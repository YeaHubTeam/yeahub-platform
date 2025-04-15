import { Profile } from '@/shared/config/i18n/i18nTranslations';

import { FullProfile } from '@/entities/auth';
import { SOCIAL_NETWORKS, SocialNetwork } from '@/entities/socialNetwork';

import { EditProfileRequestData, ProfileSchema } from '../model/types/editProfileTypes';
import { AboutMeTabForm } from '../ui/AboutMeTabForm/AboutMeTabForm';
import { PersonalInformationTabForm } from '../ui/PersonalInformationTabForm/PersonalInformationTabForm';
import { SkillsTabForm } from '../ui/SkillsTabForm/SkillsTabForm';

export const getTabs = (t: (arg: string) => string) => [
	{
		id: 0,
		title: 'personal-information',
		label: t(Profile.TABS_PERSONAL),
		Component: PersonalInformationTabForm,
	},
	{
		id: 1,
		title: 'about-me',
		label: t(Profile.TABS_ABOUT_ME),
		Component: AboutMeTabForm,
	},
	{
		id: 2,
		title: 'skills',
		label: t(Profile.TABS_SKILLS),
		Component: SkillsTabForm,
	},
];

export const mapProfileToForm = (profile: FullProfile): ProfileSchema => ({
	//image: profile.image_src,
	username: profile.username,
	specialization: profile.profiles[0].specializationId,
	email: profile.email,
	location: profile.city,
	socialNetworks: SOCIAL_NETWORKS.reduce((result: SocialNetwork[], socialNetwork) => {
		const currentSocialNetwork = profile.profiles[0].socialNetwork?.find(
			({ code }) => code === socialNetwork.code,
		);
		result.push({
			code: socialNetwork.code,
			title: currentSocialNetwork?.title || '',
		});
		return result;
	}, []),
	aboutMe: profile.profiles[0].description,
	skills: profile.profiles[0].profileSkills.map((skill) => skill.id),
});

export const mapFormToProfile = (
	profile: FullProfile,
	values: ProfileSchema,
): EditProfileRequestData => ({
	...profile.profiles[0],
	id: profile.profiles[0].id,
	specializationId: values.specialization,
	description: values.aboutMe || '',
	socialNetwork: values.socialNetworks
		? values.socialNetworks.filter((socialNetwork) => socialNetwork.title)
		: [],
	profileSkills: values.skills || [],
	user: {
		...profile,
		id: profile.id,
		email: values.email,
		username: values.username,
		city: values.location || profile.city || '',
		birthday: profile.birthday || null,
		address: profile.address || '',
		avatarUrl: profile.avatarUrl || '',
		avatarImage: values.image,
	},
});
