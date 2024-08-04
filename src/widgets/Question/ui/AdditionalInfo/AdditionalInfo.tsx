import { Chip, Icon } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Skill } from '@/entities/skill';

import styles from './AdditionalInfo.module.css';

//todo после обновления рейтинга и сложности скорректировать рендер компонента
interface Props {
	rate?: number;
	questionSkills?: Skill[];
}

export const AdditionalInfo = ({ rate, questionSkills }: Props) => {
	return (
		<Block className={styles['normal-hight']}>
			<div className={styles.wrapper}>
				<h4 className={styles.title}>Уровень:</h4>
				<ul className={styles['param-wrapper']}>
					<QuestionParam label="Сложность" value={rate ?? 0} />
					<QuestionParam label="Рейтинг" value={rate ?? 0} />
				</ul>
			</div>
			<div>
				<h4 className={styles.title}>Навыки:</h4>
				<ul className={styles['param-wrapper']}>
					{questionSkills?.length
						? questionSkills.map((skill) => {
								return (
									<Chip
										key={skill.id}
										className={styles.chip}
										label={skill.title}
										theme="primary"
										active
										preffix={skill.imageSrc ? skill.imageSrc : <Icon icon="atom" />}
									/>
								);
							})
						: 'автор так и не понял к какой технологии относится данный вопрос'}
				</ul>
			</div>
		</Block>
	);
};
