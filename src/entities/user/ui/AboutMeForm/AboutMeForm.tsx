import { useFormContext } from 'react-hook-form';
import { Button, TextArea } from 'yeahub-ui-kit';

import { FormControl } from '@/shared/ui/FormControl';

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
					<FormControl name="aboutMe" control={control} error={errors.aboutMe?.message}>
						<TextArea {...register('aboutMe')} placeholder="Placeholder" />
					</FormControl>
				</div>
			</HorizontalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</div>
		</>
	);
};
