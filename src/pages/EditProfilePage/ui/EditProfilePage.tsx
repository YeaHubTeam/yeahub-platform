import { useState } from 'react';

import { Tabs } from '@/features/common/Tabs';

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
				{currentActiveTab === 0 && <div>test 0 </div>}
				{currentActiveTab === 1 && (
					<div className={cls.container}>
						<div className={cls.description}>
							<h3>О себе любимом(-ой)</h3>
							<p>
								Расскажи о себе всему сообществу. Мы ценим человека не за его профессиональные
								качества, поэтому пиши всё чем хочешь поделиться
							</p>
						</div>
						<div className={cls['textarea-container']}>
							<textarea name="" id=""></textarea>
						</div>
					</div>
				)}
			</form>
		</section>
	);
};
