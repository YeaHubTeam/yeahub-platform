import { Block } from '@/shared/ui/Block';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { SkillLabel } from '@/shared/ui/SkillLabel';

import styles from './AdditionalInfo.module.css';

export const AdditionalInfo = () => {
	return (
		<Block>
			<div className={styles.wrapper}>
				<h4 className={styles.title}>Уровень:</h4>
				<ul className={styles['param-wrapper']}>
					<QuestionParam label="Сложность" value={10} />
					<QuestionParam label="Рейтинг" value={10} />
				</ul>
			</div>
			<div>
				<h4 className={styles.title}>Навыки:</h4>
				{/* //todo после правки интрфейса скила доделать нормальное отображение*/}
				<ul className={styles['param-wrapper']}>
					<SkillLabel img={undefined} title="React" />
					<SkillLabel img={undefined} title="JavaScript" />
					<SkillLabel img={undefined} title="Dom" />
				</ul>
			</div>
		</Block>
	);
};
