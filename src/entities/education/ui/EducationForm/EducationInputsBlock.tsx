import { Button, Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import cls from './EducationForm.module.css';

export const EducationInputsBlock = () => {
	return (
		<div className={cls['right-wrapper']}>
			<ImageLoader />
			<div className={cls['inputs-wrapper']}>
				<Label className={cls.label} text="Учебное заведение" required>
					<Input className={cls.input} />
				</Label>
				<Label className={cls.label} text="Уровень" required>
					<Input className={cls.input} />
				</Label>
				<Label className={cls.label} text="Специальность" required>
					<Input className={cls.input} />
				</Label>
				<Label className={cls.label} text="Начало обучения" required>
					<Input className={cls.input} />
				</Label>
				<Label className={cls.label} text="Конец обучения" required>
					<Input className={cls.input} />
					<span>Если учитесь в настоящее время — укажите год предполагаемого окончания</span>
				</Label>
				<div className={cls['container-btn']}>
					<Button size="large" theme="tertiary" textClassName={cls['btn-text']}>
						Удалить место учебы
					</Button>
				</div>
			</div>
		</div>
	);
};
