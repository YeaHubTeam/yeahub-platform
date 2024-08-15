import { HorizontalContainer, NextBtn } from '../CommonElements';

import style from './AboutMeForm.module.css';

export const AboutMeForm = () => {
	return (
		<>
			<HorizontalContainer>
				<div className={style.description}>
					<h3>О себе любимом(-ой)</h3>
					<p>
						Расскажи о себе всему сообществу. Мы ценим человека не за его профессиональные качества,
						поэтому пиши всё чем хочешь поделиться
					</p>
				</div>
				{/* todo: заменить на текст из кита */}
				<div className={style['textarea-container']}>
					<textarea name="" id=""></textarea>
				</div>
			</HorizontalContainer>
			<NextBtn />
		</>
	);
};
