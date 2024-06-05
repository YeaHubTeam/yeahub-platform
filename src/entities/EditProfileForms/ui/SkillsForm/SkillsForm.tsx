import { Input, Label } from 'yeahub-ui-kit';

import { HorizontalContainer, NextBtn, VerticalContainer } from '../CommonElements';

import cls from './SkillsForm.module.css';

export const SkillsForm = () => {
	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={cls.description}>
						<h3>Твои навыки</h3>
						<p>Покажи что ты умеешь и в чём ты действительно хорошо</p>
					</div>
					<div className={cls['inputs-wrapper']}>
						<Label className={cls.label} text="Навык">
							<Input className={cls.input} placeholder="Выбери навык из списка" />
						</Label>
						<p className={cls.subtitle}>Выбранные навыки</p>
					</div>
				</HorizontalContainer>
			</VerticalContainer>
			<NextBtn />
		</>
	);
};
