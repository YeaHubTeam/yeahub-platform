import { Button, Icon, Input, Label } from 'yeahub-ui-kit';

import { ImageLoader } from '@/shared/ui/ImageLoader';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';

import cls from './ProjectForm.module.css';

export const ProjectForm = () => {
	return (
		<>
			<div className={cls['container-top']}>
				<div className={cls.description}>
					<h3>Твои проекты</h3>
					<p>Вау, а ты хорош</p>
				</div>

				<div className={cls['container-top-btn']}>
					<Button className={cls['btn-add']} theme="tertiary" textClassName={cls['btn-add']}>
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
					<div className={cls.description}>
						<h3>Твои навыки</h3>
						<p>Покажи что ты умеешь и в чём ты действительно хорошо</p>
					</div>
					<div className={cls['right-wrapper']}>
						<ImageLoader />
						<div className={cls['inputs-wrapper']}>
							<Label className={cls.label} text="Название проекта" required>
								<Input className={cls.input} />
							</Label>
							<Label className={cls.label} text="Ссылка на проект" required>
								<Input className={cls.input} />
							</Label>
							<Label className={cls['label-textarea']} text="Описание проекта" required>
								<textarea
									className={cls.textarea}
									placeholder="Расскажи чуть подробнее о проекте"
									name=""
									id=""
								></textarea>
							</Label>
						</div>
						<div className={cls['container-bottom-btn']}>
							<Button size="medium" theme="tertiary" textClassName={cls['btn-text']}>
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
