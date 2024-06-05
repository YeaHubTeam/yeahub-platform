import { HorizontalContainer, NextBtn } from '../CommonElements';

import cls from './AboutMeForm.module.css';

export const AboutMeForm = () => {
	return (
		<>
			<HorizontalContainer>
				<div className={cls.description}>
					<h3>О себе любимом(-ой)</h3>
					<p>
						Расскажи о себе всему сообществу. Мы ценим человека не за его профессиональные качества,
						поэтому пиши всё чем хочешь поделиться
					</p>
				</div>
				<div className={cls['textarea-container']}>
					<textarea name="" id=""></textarea>
				</div>
			</HorizontalContainer>
			<NextBtn />
		</>
	);
};
