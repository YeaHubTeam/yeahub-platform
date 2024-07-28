import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Tabs } from '@/shared/ui/Tabs';

import { EducationFrom } from '@/entities/education';
import { ExperienceForm } from '@/entities/experience';
import { ProjectForm } from '@/entities/project';
import { SkillsForm } from '@/entities/skill';
import { AboutMeForm, PersonalInformationForm } from '@/entities/user';

import style from './EditProfileForm.module.css';

const tabs = [
	{
		id: 0,
		title: 'personal-information',
		label: 'Личная информация',
		Component: PersonalInformationForm,
	},
	{
		id: 1,
		title: 'about-me',
		label: 'Обо мне',
		Component: AboutMeForm,
	},
	{
		id: 2,
		title: 'skills',
		label: 'Навыки',
		Component: SkillsForm,
	},
	{
		id: 3,
		title: 'projects',
		label: 'Проекты',
		Component: ProjectForm,
	},
	{
		id: 4,
		title: 'experience',
		label: 'Опыт работы',
		Component: ExperienceForm,
	},
	{
		id: 5,
		title: 'education',
		label: 'Образование',
		Component: EducationFrom,
	},
];

export const EditProfileForm = () => {
	const { hash } = useLocation();
	const [currentActiveTab, setCurrentActiveTab] = useState(() => {
		return tabs.find((tab) => tab.title === hash.slice(1))?.id ?? 0;
	});

	return (
		<section className={style.section}>
			<Tabs
				title="Редактирование профиля"
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
