import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Checkbox, Input, Label } from 'yeahub-ui-kit';

import style from './ExperienceForm.module.css';

interface ExperienceFormInputs {
	companyName: string;
	position: string;
	employmentType: string;
	location: string;
	experienceStartDate: string;
	experienceEndDate?: string | null;
}

export const ExperienceInputsBlock = () => {
	const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
	const {
		register,
		formState: { errors },
		setValue,
	} = useFormContext<ExperienceFormInputs>();

	useEffect(() => {
		if (isCurrentlyWorking) {
			setValue('experienceEndDate', null);
		}
	}, [isCurrentlyWorking, setValue]);

	const handleCheckbox = () => {
		setIsCurrentlyWorking((prev) => !prev);
	};

	return (
		<div className={style['inputs-wrapper']}>
			<Label className={style.label} text="Место работы" required>
				<Input
					{...register('companyName')}
					className={style.input}
					placeholder="Название компании или фриланс"
				/>
				<div className={style.error}>{errors.companyName?.message}</div>
			</Label>
			<Label className={style.label} text="Позиция" required>
				<Input {...register('position')} className={style.input} />
				<div className={style.error}>{errors.position?.message}</div>
			</Label>
			<Label className={style.label} text="Занятость" required>
				<Input {...register('employmentType')} className={style.input} />
				<div className={style.error}>{errors.employmentType?.message}</div>
			</Label>
			<Label className={style.label} text="Локация">
				<Input {...register('location')} className={style.input} />
				<div className={style.error}>{errors.location?.message}</div>
			</Label>
			<Label className={style.label} text="Начало работы" required>
				<Input type="date" {...register('experienceStartDate')} className={style.input} />
				<div className={style.error}>{errors.experienceStartDate?.message}</div>
			</Label>
			<Label className={style.label} text="Окончание работы" required>
				<Input
					type="date"
					{...register('experienceEndDate')}
					className={style.input}
					disabled={isCurrentlyWorking}
				/>
				<div className={style.error}>
					{isCurrentlyWorking ? '' : errors.experienceEndDate?.message}
				</div>
			</Label>
			<div className={style['container-btn']}>
				<Checkbox
					className={style.checkbox}
					onToggle={handleCheckbox}
					checked={isCurrentlyWorking}
					label="По настоящее время"
				/>
				<Button size="large" theme="tertiary" textClassName={style['btn-text']}>
					Удалить место работы
				</Button>
			</div>
		</div>
	);
};
