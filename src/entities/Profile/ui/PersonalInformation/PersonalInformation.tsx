import { Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import cls from './PersonalInformation.module.css';

export const PersonalInformation = () => {
	return (
		<div className={cls.container}>
			<div className={cls.wrapper}>
				<div className={cls.description}>
					<h3>Фото профиля</h3>
					<p>Ваше фото будет видно всем членам сообщества Yeahub</p>
				</div>
				<ImageLoader />
			</div>
			<div className={cls.wrapper}>
				<div className={cls.description}>
					<h3>Персональная информация</h3>
					<p>Сюда мы тоже что-нибудь классное придумаем</p>
				</div>
				<div className={cls['inputs-wrapper']}>
					<Label className={cls.label} required text="Имя и фамилия">
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} required text="IT Специальность">
						<Input className={cls.input} placeholder="Граф. дизайнер" />
					</Label>
					<Label className={cls.label} text="Номер для связи">
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} text="Email для связи">
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} text="Локация">
						<Input className={cls.input} placeholder="Напр. Санкт-Петербург, Россия" />
					</Label>
				</div>
			</div>
			<div className={cls.wrapper}>
				<div className={cls.description}>
					<h3>Личные ссылки</h3>
					<p>Поделитесь своими профилями в других соц. сетях</p>
				</div>
				<div className={cls['inputs-wrapper']}>
					<Label className={cls.label} text="Платформа">
						<Input className={cls.input} />
					</Label>
					{/* сдесь позже будут проставляться инпуты в зависимости от того какие платформы выбирает пользователь */}
				</div>
			</div>
		</div>
	);
};
