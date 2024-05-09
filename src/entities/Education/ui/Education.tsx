import { Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import cls from './Education.module.css';
export const Education = () => {
	return (
		<div className={cls.container}>
			<div className={cls.wrapper}>
				<div className={cls.description}>
					<h3>Где ты учился(-ась)</h3>
					<p>
						Мы понимаем что в IT образование уступает в приоритете навыкам, но это так же важно.
					</p>
				</div>
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
						</Label>
					</div>
				</div>
			</div>
		</div>
	);
};
