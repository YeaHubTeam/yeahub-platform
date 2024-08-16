import { useFormContext } from 'react-hook-form';
import { Button, Input, Label } from 'yeahub-ui-kit';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';

import style from './SkillsForm.module.css';

//todo добавить рендер ошибок при валидации, добавить интерфейс для формы

export const SkillsForm = () => {
	const {
		register,
		//formState: { errors },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} = useFormContext<any>();

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
							<Input
								{...register('skills')}
								className={style.input}
								placeholder="Выбери навык из списка"
							/>
						</Label>
						<p className={style.subtitle}>Выбранные навыки</p>
					</div>
				</HorizontalContainer>
			</VerticalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</div>
		</>
	);
};
