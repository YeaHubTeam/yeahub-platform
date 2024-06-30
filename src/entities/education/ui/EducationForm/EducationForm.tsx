import { AddAndSave, HorizontalContainer, VerticalContainer } from '../CommonElements';

import cls from './EducationForm.module.css';
import { EducationInputsBlock } from './EducationInputsBlock';

export const EducationFrom = () => {
	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={cls.description}>
						<h3>Где ты учился(-ась)</h3>
						<p>
							Мы понимаем что в IT образование уступает в приоритете навыкам, но это так же важно.
						</p>
					</div>
					<EducationInputsBlock />
				</HorizontalContainer>
			</VerticalContainer>
			<AddAndSave textFirst="Добавит ещё одно место обучения" />
		</>
	);
};
