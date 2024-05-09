import { useState } from 'react';

import { Tabs } from '@/shared/ui/Tabs';

import { Education } from '@/entities/Education';
import { Experience } from '@/entities/Experience';
import { AboutMe, PersonalInformation } from '@/entities/Profile';
import { Skills } from '@/entities/Skills';

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
				{currentActiveTab === 0 && <PersonalInformation />}
				{currentActiveTab === 1 && <AboutMe />}
				{currentActiveTab === 2 && <Skills />}
				{/* {currentActiveTab === 3 && <Projects />} ToDo создать блок */}
				{currentActiveTab === 4 && <Experience />}
				{currentActiveTab === 5 && <Education />}
			</form>
		</section>
	);
};
