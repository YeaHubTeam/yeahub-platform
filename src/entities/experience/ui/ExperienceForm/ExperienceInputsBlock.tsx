import { Button, Checkbox, Input, Label } from 'yeahub-ui-kit';

import style from './ExperienceForm.module.css';

export const ExperienceInputsBlock = () => {
	const handleCheckbox = () => {};

	return (
		<div className={style['inputs-wrapper']}>
			<Label className={style.label} text="Место работы" required>
				<Input className={style.input} placeholder="Название компании или фриланс" />
			</Label>
			<Label className={style.label} text="Позиция" required>
				<Input className={style.input} />
			</Label>
			<Label className={style.label} text="Занятость" required>
				<Input className={style.input} />
			</Label>
			<Label className={style.label} text="Локация">
				<Input className={style.input} />
			</Label>
			<Label className={style.label} text="Начало работы" required>
				<Input className={style.input} />
			</Label>
			<Label className={style.label} text="Окончание работы" required>
				<Input className={style.input} />
			</Label>
			<div className={style['container-btn']}>
				<Checkbox className={style.checkbox} onToggle={handleCheckbox} label="По настоящее время" />
				<Button size="large" theme="tertiary" textClassName={style['btn-text']}>
					Удалить место работы
				</Button>
			</div>
		</div>
	);
};
