import { Link } from 'react-router-dom';
import { Chip, Icon } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import { Skill } from '@/entities/skill';

import styles from './AdditionalInfo.module.css';

//todo после обновления рейтинга и сложности скорректировать рендер компонента
interface AdditionalInfoProps {
	rate?: number;
	complexity?: number;
	keywords?: string[];
	questionSkills?: Skill[];
}

export const AdditionalInfo = ({
	rate,
	complexity,
	questionSkills,
	keywords,
}: AdditionalInfoProps) => {
	return (
		<Block className={styles['normal-hight']}>
			<div className={styles.wrapper}>
				<h4 className={styles.title}>Уровень:</h4>
				<ul className={styles['param-wrapper']}>
					<QuestionParam label="Сложность" value={complexity ?? 0} />
					<QuestionParam label="Рейтинг" value={rate ?? 0} />
				</ul>
			</div>
			<div className={styles.wrapper}>
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
			{keywords && !!keywords.length && (
				<div>
					<h4 className={styles.title}>Ключевые слова:</h4>
					<div className={styles['keywords-wrapper']}>
						{keywords.map((keyword) => {
							return (
								<Link
									key={keyword}
									to={'/interview/questions?keyword=' + encodeURIComponent(keyword)}
								>{`#${keyword}`}</Link>
							);
						})}
					</div>
				</div>
			)}
		</Block>
	);
};
