import { Button, Checkbox, Input, Label } from 'yeahub-ui-kit';

import cls from './ExperienceForm.module.css';

export const ExperienceInputsBlock = () => {
	const handleCheckbox = () => {};

	return (
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
			<div className={cls['container-btn']}>
				<Checkbox className={cls.checkbox} onToggle={handleCheckbox} label="По настоящее время" />
				<Button size="large" theme="tertiary" textClassName={cls['btn-text']}>
					Удалить место работы
				</Button>
			</div>
		</div>
	);
};
