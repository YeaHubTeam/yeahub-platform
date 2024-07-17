import { Input, Label } from 'yeahub-ui-kit';

import { HorizontalContainer, NextBtn, VerticalContainer } from '../CommonElements';

import style from './SkillsForm.module.css';

export const SkillsForm = () => {
	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>Твои навыки</h3>
						<p>Покажи что ты умеешь и в чём ты действительно хорошо</p>
					</div>
					<div className={style['inputs-wrapper']}>
						<Label className={style.label} text="Навык">
							<Input className={style.input} placeholder="Выбери навык из списка" />
						</Label>
						<p className={style.subtitle}>Выбранные навыки</p>
					</div>
				</HorizontalContainer>
			</VerticalContainer>
			<NextBtn />
		</>
	);
};
