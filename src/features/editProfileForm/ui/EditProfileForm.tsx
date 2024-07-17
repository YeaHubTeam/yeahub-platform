import { useState } from 'react';

import { Tabs } from '@/shared/ui/Tabs';

import { EducationFrom } from '@/entities/education';
import { ExperienceForm } from '@/entities/experience';
import { ProjectForm } from '@/entities/project';
import { SkillsForm } from '@/entities/skill';
import { AboutMeForm, PersonalInformationForm } from '@/entities/user';

import style from './EditProfileForm.module.css';

const tabs = ['Личная информация', 'Обо мне', 'Навыки', 'Проекты', 'Опыт работы', 'Образование'];

export const EditProfileForm = () => {
	const [currentActiveTab, setCurrentActiveTab] = useState(0);

	return (
		<section className={style.section}>
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
