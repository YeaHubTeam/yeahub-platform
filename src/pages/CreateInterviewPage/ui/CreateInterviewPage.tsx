import { Chip, Icon } from 'yeahub-ui-kit';

import { useGetSkillsListQuery } from '@/entities/skill';

import styles from './CreateInterviewPage.module.css';

const MAX_LIMIT = 100;

const CreateInterviewPage = () => {
	const { data: skills } = useGetSkillsListQuery({ limit: MAX_LIMIT });
	console.log(skills?.data);

	return (
		<div className={styles.wrapper}>
			<h2>Собеседование</h2>
			<div>
				<h3>Категории вопросов</h3>
				<div className={styles['styles-wrapper']}>
					{skills &&
						skills.data.map((skill) => {
							return (
								<Chip
									key={skill?.id}
									className={styles.chip}
									label={skill.title}
									theme="primary"
									preffix={skill.imageSrc ? <Icon icon="fileHtml" /> : null}
									onClick={() => console.log('clicked')}
									active={false}
								/>
							);
						})}
				</div>
				<div>
					<div>
						<p>Уровень сложности</p>
					</div>
					<div>
						<p>Выберите режим</p>
					</div>
					<div>
						<p>Количество вопросов</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateInterviewPage;
