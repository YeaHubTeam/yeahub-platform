import { Controller, useFormContext } from 'react-hook-form';
import { Button, TextArea } from 'yeahub-ui-kit';

import { HorizontalContainer } from '../CommonElements';

import style from './AboutMeForm.module.css';

interface AboutMeFormInputs {
	aboutMe: string;
}

export const AboutMeForm = () => {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<AboutMeFormInputs>();

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
							<TextArea
								{...register('aboutMe')}
								placeholder="Placeholder"
								onChange={onChange}
								value={value}
							/>
						)}
					/>
					<div className={style.error}>{errors.aboutMe?.message}</div>
				</div>
			</HorizontalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</div>
		</>
	);
};
