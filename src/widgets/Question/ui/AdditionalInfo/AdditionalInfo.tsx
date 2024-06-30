import { Chip, Icon } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';
import { QuestionParam } from '@/shared/ui/QuestionParam';

import styles from './AdditionalInfo.module.css';

export const AdditionalInfo = () => {
	return (
		<Block className={styles['normal-hight']}>
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
					<Chip
						className={styles.chip}
						label={'React'}
						theme="primary"
						active
						preffix={<Icon icon="atom" />}
					/>
					<Chip
						className={styles.chip}
						label={'JavaScript'}
						theme="primary"
						active
						preffix={<Icon icon="fileJs" />}
					/>
					<Chip
						className={styles.chip}
						label={'DOM'}
						theme="primary"
						active
						preffix={<Icon icon="fileHtml" />}
					/>
				</ul>
			</div>
		</Block>
	);
};
