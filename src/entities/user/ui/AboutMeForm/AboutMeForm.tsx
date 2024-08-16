import { Controller, useFormContext } from 'react-hook-form';
import { Button, TextArea } from 'yeahub-ui-kit';

import { HorizontalContainer } from '../CommonElements';

import style from './AboutMeForm.module.css';

//todo добавить рендер ошибок при валидации, добавить интерфейс для формы

export const AboutMeForm = () => {
	const {
		control,
		//formState: { errors },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} = useFormContext<any>();

	return (
		<>
			<HorizontalContainer>
				<div className={style.description}>
					<h3>О себе любимом(-ой)</h3>
					<p>
						Расскажи о себе всему сообществу. Мы ценим человека не за его профессиональные качества,
						поэтому пиши всё чем хочешь поделиться
					</p>
				</div>
				{/* todo: заменить на текст из кита */}
				<div className={style['textarea-container']}>
					<Controller
						name="aboutMe"
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextArea placeholder="Placeholder" onChange={onChange} value={value} />
						)}
					/>
				</div>
			</HorizontalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</div>
		</>
	);
};
