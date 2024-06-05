import { HorizontalContainer, VerticalContainer } from '../CommonElements';
import { AddAndSave } from '../CommonElements/AddAndSave/AddAndSave';

import cls from './ExperienceForm.module.css';
import { ExperienceInputsBlock } from './ExperienceInputsBlock';

export const ExperienceForm = () => {
	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={cls.description}>
						<h3>Где ты работал(-а)</h3>
						<p>Сюда мы тоже что-нибудь классное придумаем</p>
					</div>
					<ExperienceInputsBlock />
				</HorizontalContainer>
			</VerticalContainer>
			<AddAndSave textFirst={'Добавит ещё одно место работы'} />
		</>
	);
};
