import { Button, Icon } from 'yeahub-ui-kit';

import { Flex } from '@/shared/ui/Flex';

import { ProjectFormField } from '@/entities/project';

import styles from './ProjectsTabForm.module.css';

export const ProjectsTabForm = () => {
	return (
		<>
			<Flex justify="between">
				<div className={styles.description}>
					<h3>Твои проекты</h3>
					<p>Вау, а ты хорош</p>
				</div>

				<Flex gap="4">
					<Button className={styles['btn-add']} theme="tertiary" textClassName={styles['btn-add']}>
						Изменить порядок
					</Button>
					<Button
						preffix={<Icon icon="plusCircle" color="--palette-ui-purple-700" />}
						theme="outline"
					>
						Добавить
					</Button>
				</Flex>
			</Flex>
			{/*ToDo add slider from uiLit */}
			<h1 style={{ textAlign: 'center', border: '1px solid black', padding: '90px' }}>
				Слайдер с UI KIT
			</h1>
			<Flex direction="column" gap="120">
				<Flex>
					<div className={styles.description}>
						<h3>Твои навыки</h3>
						<p>Покажи что ты умеешь и в чём ты действительно хорошо</p>
					</div>
					<Flex direction="column" gap="32">
						<ProjectFormField />
						<div className={styles['container-bottom-btn']}>
							<Button size="medium" theme="tertiary" textClassName={styles['btn-text']}>
								Удалить
							</Button>
							<Button>Сохранить</Button>
						</div>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
