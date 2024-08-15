import { useFormContext } from 'react-hook-form';

import { AboutMeInformation } from '../../model/types/aboutMeInformation';
import { HorizontalContainer, NextBtn } from '../CommonElements';

import style from './AboutMeForm.module.css';

export const AboutMeForm = () => {
	const {
		handleSubmit,
		register,
		//formState: { errors },
	} = useFormContext<AboutMeInformation>();

	const onChangeAboutMeInformation = (data: AboutMeInformation) => {
		console.log(data);
	};
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
					<textarea {...register('aboutMe')} />
				</div>
			</HorizontalContainer>
			<NextBtn handleClick={handleSubmit(onChangeAboutMeInformation)} />
		</>
	);
};
