import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Button, Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SocialNetWorkInputs } from '@/entities/socialNetwork';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';

import style from './PersonalInformationForm.module.css';

interface PersonalInformationInputs {
	name: string;
	specialization: number;
	phone: string;
	email: string;
	location: string;
	skillLevel: string;
	socials: string;
}

export const PersonalInformationForm = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<PersonalInformationInputs>();

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
							<div className={style.error}>{errors.name?.message}</div>
						</Label>
						<Label className={style.label} required text="IT Специальность">
							<Controller
								{...register('specialization')}
								name="specialization"
								control={control}
								render={({ field: { onChange, value } }) => (
									<SpecializationSelect onChange={onChange} value={value} />
								)}
							/>
							<div className={style.error}>{errors.specialization?.message}</div>
						</Label>
						<Label className={style.label} text="Номер для связи">
							<Controller
								name="phone"
								control={control}
								render={({ field: { onChange, value } }) => (
									<>
										<InputMask
											{...register('phone')}
											className={style.phone}
											mask={'+7-(999)-999-99-99'}
											placeholder={'+7-(XXX)-XXX-XX-XX'}
											onChange={onChange}
											value={value}
										/>
										<div className={style.error}>{errors.phone?.message}</div>
									</>
								)}
							/>
						</Label>
						<Label className={style.label} text="Email для связи">
							<Input {...register('email')} className={style.input} />
							<div className={style.error}>{errors.email?.message}</div>
						</Label>
						<Label className={style.label} text="Локация">
							<Input
								{...register('location')}
								className={style.input}
								placeholder="Напр. Санкт-Петербург, Россия"
							/>
							<div className={style.error}>{errors.location?.message}</div>
						</Label>
						{/* <Label className={style.label} text="Уровень специалиста">
							<Input {...register('skillLevel')} className={style.input} placeholder="Junior" />
						</Label> */}
					</div>
				</HorizontalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>Личные ссылки</h3>
						<p>Поделитесь своими профилями в других соц. сетях</p>
					</div>
					<div className={style['inputs-wrapper']}>
						<SocialNetWorkInputs />
					</div>
				</HorizontalContainer>
			</VerticalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">Сохранить</Button>
			</div>
		</>
	);
};
