import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Tabs } from '@/shared/ui/Tabs';

import { useProfileQuery } from '@/entities/auth';
import { SkillsForm } from '@/entities/skill';
import { AboutMeForm, PersonalInformationForm } from '@/entities/user';
import { useUpdateProfileMutation } from '@/entities/user';

import { profileSchema } from '../model/lib/validation/profileSchema';
import { ProfileSchema } from '../model/types/profileTypes';

import style from './EditProfileForm.module.css';

export const EditProfileForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const methods = useForm<ProfileSchema>({
		resolver: yupResolver(profileSchema),
		mode: 'onBlur',
	});

	const tabs = [
		{
			id: 0,
			title: 'personal-information',
			label: t(Profile.TABS_ITEMS_PERSONALINFORMATION),
			Component: PersonalInformationForm,
		},
		{
			id: 1,
			title: 'about-me',
			label: t(Profile.TABS_ITEMS_ABOUTME),
			Component: AboutMeForm,
		},
		{
			id: 2,
			title: 'skills',
			label: t(Profile.TABS_ITEMS_SKILLS),
			Component: SkillsForm,
		},
		// {
		// 	id: 3,
		// 	title: 'projects',
		// 	label: t('tabs.items.projects'),
		// 	Component: ProjectForm,
		// },
		// {
		// 	id: 4,
		// 	title: 'experience',
		// 	label: t('tabs.items.experience'),
		// 	Component: ExperienceForm,
		// },
		// {
		// 	id: 5,
		// 	title: 'education',
		// 	label: t('tabs.items.education'),
		// 	Component: EducationFrom,
		// },
	];

	const { data: profile } = useProfileQuery();
	const profileId = profile?.profiles[0].profileId;

	const [updateProfile] = useUpdateProfileMutation();

	const { hash } = useLocation();
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (data: any) => {
		// eslint-disable-next-line no-console
		console.log(data);

		updateProfile({
			...data,
			id: profileId ?? '',
		});

		// Раскомментировать при необходимости стирать поля
		// methods.reset();
	};

	return (
		<section className={style.section}>
			<Tabs
				title={t('tabs.title')}
				tabs={tabs}
				tabToggle={currentActiveTab}
				setTabToggle={setCurrentActiveTab}
			/>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					{tabs.map(({ id, Component }) => currentActiveTab === id && <Component key={id} />)}
				</form>
			</FormProvider>
		</section>
	);
};
