import { Controller, useFormContext } from 'react-hook-form';
import { Button } from 'yeahub-ui-kit';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';
import { SkillSelect } from '../SkillSelect/SkillSelect';

import style from './SkillsForm.module.css';

//todo добавить рендер ошибок при валидации, добавить интерфейс для формы

export const SkillsForm = () => {
	const {
		control,
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
					<Controller
						name="skills"
						control={control}
						render={({ field: { onChange, value } }) => (
							<SkillSelect onChange={onChange} value={value} />
						)}
					/>
				</HorizontalContainer>
			</VerticalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</div>
		</>
	);
};
