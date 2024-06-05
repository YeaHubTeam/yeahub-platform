import { useState } from 'react';

import { Tabs } from '@/shared/ui/Tabs';

import {
	AboutMeForm,
	EducationFrom,
	ExperienceForm,
	PersonalInformationForm,
	ProjectForm,
	SkillsForm,
} from '@/entities/EditProfileForms';

import cls from './EditProfilePage.module.css';

const tabs = ['Личная информация', 'Обо мне', 'Навыки', 'Проекты', 'Опыт работы', 'Образование'];

export const EditProfilePage = () => {
	const [currentActiveTab, setCurrentActiveTab] = useState(0);

	return (
		<section className={cls.section}>
			<Tabs
				title="Редактирование профиля"
				names={tabs}
				tabToggle={currentActiveTab}
				setTabToggle={setCurrentActiveTab}
			/>
			<form>
				{currentActiveTab === 0 && <PersonalInformationForm />}
				{currentActiveTab === 1 && <AboutMeForm />}
				{currentActiveTab === 2 && <SkillsForm />}
				{currentActiveTab === 3 && <ProjectForm />}
				{currentActiveTab === 4 && <ExperienceForm />}
				{currentActiveTab === 5 && <EducationFrom />}
			</form>
		</section>
	);
};
