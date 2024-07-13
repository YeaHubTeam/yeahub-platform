import { Icon } from 'yeahub-ui-kit';

import styles from './QuestionCategories.module.css';

interface Props {
	questionCategories: string[];
}

export const QuestionCategories = ({ questionCategories }: Props) => {
	return (
		<div>
			<p className={styles.title}>Категории вопросов</p>
			{questionCategories?.map((category) => {
				return (
					<div key={category} className={styles.category}>
						<Icon
							icon="cubeFocus"
							size={20}
							color="--palette-ui-black-500"
							className={styles.icon}
						/>
						<span>{category}</span>
					</div>
				);
			})}
		</div>
	);
};
