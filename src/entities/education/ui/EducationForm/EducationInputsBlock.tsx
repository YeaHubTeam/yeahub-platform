import { Button, Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import style from './EducationForm.module.css';

export const EducationInputsBlock = () => {
	return (
		<div className={style['right-wrapper']}>
			<ImageLoader />
			<div className={style['inputs-wrapper']}>
				<Label className={style.label} text="Учебное заведение" required>
					<Input className={style.input} />
				</Label>
				<Label className={style.label} text="Уровень" required>
					<Input className={style.input} />
				</Label>
				<Label className={style.label} text="Специальность" required>
					<Input className={style.input} />
				</Label>
				<Label className={style.label} text="Начало обучения" required>
					<Input className={style.input} />
				</Label>
				<Label className={style.label} text="Конец обучения" required>
					<Input className={style.input} />
					<span>Если учитесь в настоящее время — укажите год предполагаемого окончания</span>
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
