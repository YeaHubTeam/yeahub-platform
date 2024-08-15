import { useFormContext } from 'react-hook-form';
import { Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import { personalInformation } from '../../model/types/personalInformation';
import { HorizontalContainer, NextBtn, VerticalContainer } from '../CommonElements';

import style from './PersonalInformationForm.module.css';

//todo добавить рендер ошибок при валидации

export const PersonalInformationForm = () => {
	const {
		handleSubmit,
		register,
		//formState: { errors },
	} = useFormContext<personalInformation>();

	const onChangePersonalInformation = (data: personalInformation) => {
		console.log(data);
	};

	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>Фото профиля</h3>
						<p>Ваше фото будет видно всем членам сообщества Yeahub</p>
					</div>
					<ImageLoader />
				</HorizontalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>Персональная информация</h3>
						<p>Сюда мы тоже что-нибудь классное придумаем</p>
					</div>
					<div className={style['inputs-wrapper']}>
						<Label className={style.label} required text="Имя и фамилия">
							<Input {...register('name')} className={style.input} />
						</Label>
						<Label className={style.label} required text="IT Специальность">
							<Input
								{...register('specialization')}
								className={style.input}
								placeholder="Граф. дизайнер"
							/>
						</Label>
						<Label className={style.label} text="Номер для связи">
							<Input {...register('phone')} className={style.input} />
						</Label>
						<Label className={style.label} text="Email для связи">
							<Input {...register('email')} className={style.input} />
						</Label>
						<Label className={style.label} text="Локация">
							<Input
								{...register('location')}
								className={style.input}
								placeholder="Напр. Санкт-Петербург, Россия"
							/>
						</Label>
						<Label className={style.label} text="Уровень специалиста">
							<Input {...register('skillLevel')} className={style.input} placeholder="Junior" />
						</Label>
					</div>
				</HorizontalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>Личные ссылки</h3>
						<p>Поделитесь своими профилями в других соц. сетях</p>
					</div>
					<div className={style['inputs-wrapper']}>
						<Label className={style.label} text="Платформа">
							<Input {...register('socialLinks')} className={style.input} />
						</Label>
						{/* ToDo сдесь позже будут проставляться инпуты в зависимости от того какие платформы выбирает пользователь */}
					</div>
				</HorizontalContainer>
			</VerticalContainer>
			<NextBtn handleClick={handleSubmit(onChangePersonalInformation)} />
		</>
	);
};
