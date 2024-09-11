import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Button, Input, Label } from 'yeahub-ui-kit';

import { FormControl } from '@/shared/ui/FormControl';
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
}

export const PersonalInformationForm = () => {
	const {
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
						<FormControl name="name" label="Имя и фамилия" error={errors.name?.message}>
							<Input className={style.input} />
						</FormControl>
						<Label className={style.label} required text="IT Специальность">
							<Controller
								name="specialization"
								control={control}
								render={({ field: { onChange, value } }) => (
									<SpecializationSelect onChange={onChange} value={value} />
								)}
							/>
							<div className={style.error}>{errors.specialization?.message}</div>
						</Label>
						<FormControl
							name="phone"
							control={control}
							label="Номер для связи"
							error={errors.phone?.message}
						>
							<InputMask
								className={style.phone}
								mask={'+7-(999)-999-99-99'}
								placeholder={'+7-(XXX)-XXX-XX-XX'}
							/>
						</FormControl>
						<FormControl name="email" label="Email для связи" error={errors.email?.message}>
							<Input className={style.input} />
						</FormControl>
						<FormControl name="location" label="Локация" error={errors.location?.message}>
							<Input className={style.input} placeholder="Напр. Санкт-Петербург, Россия" />
						</FormControl>
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
