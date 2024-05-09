import { Input, Label } from 'yeahub-ui-kit';

import cls from './Experience.module.css';
export const Experience = () => {
	return (
		<div className={cls.container}>
			<div className={cls.wrapper}>
				<div className={cls.description}>
					<h3>Где ты работал(-а)</h3>
					<p>Сюда мы тоже что-нибудь классное придумаем</p>
				</div>
				<div className={cls['inputs-wrapper']}>
					<Label className={cls.label} text="Место работы" required>
						<Input className={cls.input} placeholder="Название компании или фриланс" />
					</Label>
					<Label className={cls.label} text="Позиция" required>
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} text="Занятость" required>
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} text="Локация">
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} text="Начало работы" required>
						<Input className={cls.input} />
					</Label>
					<Label className={cls.label} text="Окончание работы" required>
						<Input className={cls.input} />
					</Label>
				</div>
			</div>
		</div>
	);
};
