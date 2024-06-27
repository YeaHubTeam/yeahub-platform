import { Input, Chip, Icon } from 'yeahub-ui-kit';

import styles from './QuestionsSearchBar.module.css';

export const QuestionsSearchBar = () => {
	return (
		<div className={styles.wrapper}>
			<Input placeholder="Введите запрос" />
			<div className={styles.section}>
				<h4 className={styles.title}>Категория вопросов</h4>
				<div className={styles['category-wrapper']}>
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
						preffix={<Icon icon="fileJs" />}
					/>
					<Chip
						className={styles.chip}
						label={'DOM'}
						theme="primary"
						preffix={<Icon icon="fileHtml" />}
					/>
				</div>
			</div>
			<div className={styles.section}>
				<h4 className={styles.title}>Сложность вопросов</h4>
				<div className={styles['category-wrapper']}>
					<Chip className={styles.chip} label={'1-3'} theme="primary" active />
					<Chip className={styles.chip} label={'4-6'} theme="primary" />
					<Chip className={styles.chip} label={'7-8'} theme="primary" />
					<Chip className={styles.chip} label={'9-10'} theme="primary" />
				</div>
			</div>
			<div className={styles.section}>
				<h4 className={styles.title}>Рейтинг</h4>
				<div className={styles['category-wrapper']}>
					<Chip className={styles.chip} label={'1'} theme="primary" active />
					<Chip className={styles.chip} label={'2'} theme="primary" />
					<Chip className={styles.chip} label={'3'} theme="primary" />
					<Chip className={styles.chip} label={'4'} theme="primary" />
					<Chip className={styles.chip} label={'5'} theme="primary" />
				</div>
			</div>
			<div className={styles.section}>
				<h4 className={styles.title}>Статус</h4>
				<div className={styles['category-wrapper']}>
					<Chip className={styles.chip} label={'Изученные'} theme="primary" active />
					<Chip className={styles.chip} label={'Неизученные'} theme="primary" />
					<Chip className={styles.chip} label={'Сохраненные'} theme="primary" />
					<Chip className={styles.chip} label={'Все'} theme="primary" />
				</div>
			</div>
		</div>
	);
};
