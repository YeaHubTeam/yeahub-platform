import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Tabs } from '@/shared/ui/Tabs';

import { EducationFrom } from '@/entities/education';
import { ExperienceForm } from '@/entities/experience';
import { ProjectForm } from '@/entities/project';
import { SkillsForm } from '@/entities/skill';
import { AboutMeForm, PersonalInformationForm } from '@/entities/user';

import style from './EditProfileForm.module.css';

export const EditProfileForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const tabs = [
		{
			id: 0,
			title: 'personal-information',
			label: t('tabs.items.personalInformation'),
			Component: PersonalInformationForm,
		},
		{
			id: 1,
			title: 'about-me',
			label: t('tabs.items.aboutMe'),
			Component: AboutMeForm,
		},
		{
			id: 2,
			title: 'skills',
			label: t('tabs.items.skills'),
			Component: SkillsForm,
		},
		{
			id: 3,
			title: 'projects',
			label: t('tabs.items.projects'),
			Component: ProjectForm,
		},
		{
			id: 4,
			title: 'experience',
			label: t('tabs.items.experience'),
			Component: ExperienceForm,
		},
		{
			id: 5,
			title: 'education',
			label: t('tabs.items.education'),
			Component: EducationFrom,
		},
	];

	const { hash } = useLocation();
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	return (
		<section className={style.section}>
			<Tabs
				title={t('tabs.title')}
				tabs={tabs}
				tabToggle={currentActiveTab}
				setTabToggle={setCurrentActiveTab}
			/>
			<form>
				{tabs.map(({ id, Component }) => currentActiveTab === id && <Component key={id} />)}
			</form>
		</section>
	);
};
