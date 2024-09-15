import { useFormContext } from 'react-hook-form';
import { Button, Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import style from './EducationForm.module.css';

interface EducationFormInputs {
	educationalInstitution: string;
	level: string;
	specialty: string;
	educationStartDate: string;
	educationEndDate: string;
}

export const EducationInputsBlock = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<EducationFormInputs>();

	return (
		<div className={style['right-wrapper']}>
			<ImageLoader />
			<div className={style['inputs-wrapper']}>
				<Label className={style.label} text="Учебное заведение" required>
					<Input {...register('educationalInstitution')} className={style.input} />
					<div className={style.error}>{errors.educationalInstitution?.message}</div>
				</Label>
				<Label className={style.label} text="Уровень" required>
					<Input {...register('level')} className={style.input} />
					<div className={style.error}>{errors.level?.message}</div>
				</Label>
				<Label className={style.label} text="Специальность" required>
					<Input {...register('specialty')} className={style.input} />
					<div className={style.error}>{errors.specialty?.message}</div>
				</Label>
				<Label className={style.label} text="Начало обучения" required>
					<Input type="date" {...register('educationStartDate')} className={style.input} />
					<div className={style.error}>{errors.educationStartDate?.message}</div>
				</Label>
				<Label className={style.label} text="Конец обучения" required>
					<Input type="date" {...register('educationEndDate')} className={style.input} />
					<span>Если учитесь в настоящее время — укажите год предполагаемого окончания</span>
					<div className={style.error}>{errors.educationEndDate?.message}</div>
				</Label>
				<div className={style['container-btn']}>
					<Button size="large" theme="tertiary" textClassName={style['btn-text']}>
						Удалить место учебы
					</Button>
				</div>
			</div>
		</div>
	);
};
