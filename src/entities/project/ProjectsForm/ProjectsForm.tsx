import { Button, Icon, Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';

import style from './ProjectForm.module.css';

export const ProjectForm = () => {
	return (
		<>
			<div className={style['container-top']}>
				<div className={style.description}>
					<h3>Твои проекты</h3>
					<p>Вау, а ты хорош</p>
				</div>

				<div className={style['container-top-btn']}>
					<Button className={style['btn-add']} theme="tertiary" textClassName={style['btn-add']}>
						Изменить порядок
					</Button>
					<Button
						preffix={<Icon icon="plusCircle" color="--palette-ui-purple-700" />}
						theme="outline"
					>
						Добавить
					</Button>
				</div>
			</div>
			{/*ToDo add slider from uiLit */}
			<h1 style={{ textAlign: 'center', border: '1px solid black', padding: '90px' }}>
				Слайдер с UI KIT
			</h1>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>Твои навыки</h3>
						<p>Покажи что ты умеешь и в чём ты действительно хорошо</p>
					</div>
					<div className={style['right-wrapper']}>
						<ImageLoader />
						<div className={style['inputs-wrapper']}>
							<Label className={style.label} text="Название проекта" required>
								<Input className={style.input} />
							</Label>
							<Label className={style.label} text="Ссылка на проект" required>
								<Input className={style.input} />
							</Label>
							<Label className={style['label-textarea']} text="Описание проекта" required>
								<textarea
									className={style.textarea}
									placeholder="Расскажи чуть подробнее о проекте"
									name=""
									id=""
								></textarea>
							</Label>
						</div>
						<div className={style['container-bottom-btn']}>
							<Button size="medium" theme="tertiary" textClassName={style['btn-text']}>
								Удалить
							</Button>
							<Button>Сохранить</Button>
						</div>
					</div>
				</HorizontalContainer>
			</VerticalContainer>
		</>
	);
};
