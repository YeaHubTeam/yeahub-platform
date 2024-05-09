import { Input, Label } from 'yeahub-ui-kit';

import cls from './Skills.module.css';
export const Skills = () => {
	return (
		<div className={cls.container}>
			<div className={cls.wrapper}>
				<div className={cls.description}>
					<h3>Твои навыки</h3>
					<p>Покажи что ты умеешь и в чём ты действительно хорошо</p>
				</div>
				<div className={cls['inputs-wrapper']}>
					<Label className={cls.label} text="Навык">
						<Input className={cls.input} placeholder="Выбери навык из списка" />
					</Label>
				</div>
			</div>
		</div>
	);
};
