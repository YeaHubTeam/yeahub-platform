import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Button, Input } from 'yeahub-ui-kit';

import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoader } from '@/shared/ui/ImageLoader';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SocialNetWorkInputs } from '@/entities/socialNetwork';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';

import style from './PersonalInformationForm.module.css';

export const PersonalInformationForm = () => {
	const { control, register } = useFormContext();

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
						<FormControl name="name" control={control} label="Имя и фамилия" className={style.form}>
							{() => <Input {...register('name')} className={style.input} />}
						</FormControl>
						<FormControl
							name="specialization"
							control={control}
							label="IT Специальность"
							className={style.form}
						>
							{({ onChange, value }) => <SpecializationSelect onChange={onChange} value={value} />}
						</FormControl>
						<FormControl
							name="phone"
							control={control}
							label="Номер для связи"
							className={style.form}
						>
							{({ onChange, value }) => (
								<InputMask
									{...register('phone')}
									className={style.phone}
									mask={'+7-(999)-999-99-99'}
									placeholder={'+7-(XXX)-XXX-XX-XX'}
									onChange={onChange}
									value={value}
								/>
							)}
						</FormControl>
						<FormControl
							name="email"
							control={control}
							label="Email для связи"
							className={style.form}
						>
							{() => <Input {...register('email')} className={style.input} />}
						</FormControl>
						<FormControl name="location" control={control} label="Локация" className={style.form}>
							{() => (
								<Input
									{...register('location')}
									className={style.input}
									placeholder="Напр. Санкт-Петербург, Россия"
								/>
							)}
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
