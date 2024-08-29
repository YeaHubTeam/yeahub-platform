import { Chip, Icon } from 'yeahub-ui-kit';

import styles from './QuestionCategories.module.css';

interface QuestionCategoriesProps {
	questionCategories: string[];
}

export const QuestionCategories = ({ questionCategories }: QuestionCategoriesProps) => {
	return (
		<ul>
			<p className={styles.title}>Категории вопросов</p>
			{questionCategories?.map((category) => {
				return (
					<li key={category} className={styles.category}>
						<Chip
							label={category}
							preffix={<Icon icon="figmaLogo" className={styles.icon} />}
							theme="primary"
						/>
					</li>
				);
			})}
		</ul>
	);
};
