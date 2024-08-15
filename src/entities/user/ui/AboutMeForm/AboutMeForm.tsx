import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from 'yeahub-ui-kit';

import { AboutMeInformation } from '../../model/types/aboutMeInformation';
import { HorizontalContainer, NextBtn } from '../CommonElements';

import style from './AboutMeForm.module.css';

export const AboutMeForm = () => {
	const {
		handleSubmit,
		control,
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
					<Controller
						name="aboutMe"
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextArea placeholder="Placeholder" onChange={onChange} value={value} />
						)}
					/>
				</div>
			</HorizontalContainer>
			<NextBtn handleClick={handleSubmit(onChangeAboutMeInformation)} />
		</>
	);
};
