import { Profile as ProfileI18 } from '@/shared/config/i18n/i18nTranslations';

import { Profile } from '@/entities/profile';
import { SOCIAL_NETWORKS, SocialNetwork } from '@/entities/socialNetwork';

import { EditProfileRequestData, ProfileSchema } from '../model/types/editProfileTypes';
import { AboutMeTabForm } from '../ui/AboutMeTabForm/AboutMeTabForm';
import { PersonalInformationTabForm } from '../ui/PersonalInformationTabForm/PersonalInformationTabForm';
import { SkillsTabForm } from '../ui/SkillsTabForm/SkillsTabForm';

export const getTabs = (t: (arg: string) => string) => [
	{
		id: 0,
		title: 'personal-information',
		label: t(ProfileI18.TABS_ITEMS_PERSONALINFORMATION),
		Component: PersonalInformationTabForm,
	},
	{
		id: 1,
		title: 'about-me',
		label: t(ProfileI18.TABS_ITEMS_ABOUTME),
		Component: AboutMeTabForm,
	},
	{
		id: 2,
		title: 'skills',
		label: t(ProfileI18.TABS_ITEMS_SKILLS),
		Component: SkillsTabForm,
	},
	// {
	// 	id: 3,
	// 	title: 'projects',
	// 	label: t('tabs.items.projects'),
	// 	Component: ProjectsTabForm,
	// },
	// {
	// 	id: 4,
	// 	title: 'experience',
	// 	label: t('tabs.items.experience'),
	// 	Component: ExperienceTabForm,
	// },
	// {
	// 	id: 5,
	// 	title: 'education',
	// 	label: t('tabs.items.education'),
	// 	Component: EducationTabFrom,
	// },
];

export const mapProfileToForm = (profile: Profile): ProfileSchema => ({
	//image: profile.image_src,
	firstName: profile.user.firstName,
	lastName: profile.user.lastName,
	specialization: profile.specializationId,
	phone: profile.user.phone,
	email: profile.user.email,
	location: profile.user.city,
	socialNetworks: SOCIAL_NETWORKS.reduce((result: SocialNetwork[], socialNetwork) => {
		const currentSocialNetwork = profile.socialNetwork?.find(
			({ code }) => code === socialNetwork.code,
		);
		result.push({
			code: socialNetwork.code,
			title: currentSocialNetwork?.title || '',
		});
		return result;
	}, []),
	aboutMe: profile.description,
	skills: profile.profileSkills.map((skill) => skill.id),
});

export const mapFormToProfile = (
	profile: Profile,
	values: ProfileSchema,
): EditProfileRequestData => ({
	...profile,
	id: profile.id,
	description: values.aboutMe || '',
	socialNetwork: values.socialNetworks || [],
	specializationId: values.specialization,
	profileSkills: values.skills || [],
	user: {
		...profile.user,
		email: values.email,
		firstName: values.firstName,
		lastName: values.lastName,
		phone: values.phone,
	},
});
