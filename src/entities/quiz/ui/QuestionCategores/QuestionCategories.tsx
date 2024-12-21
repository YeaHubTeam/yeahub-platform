import { useTranslation } from 'react-i18next';
import { Chip, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';

import styles from './QuestionCategories.module.css';

interface QuestionCategoriesProps {
	questionCategories: string[];
}

export const QuestionCategories = ({ questionCategories }: QuestionCategoriesProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<>
			<p className={styles.title}>{t(Questions.CATEGORIES_TITLE)}</p>
			<ul className={styles.list}>
				{questionCategories?.map((category) => {
					return (
						<li key={category} className={styles.category}>
							<Chip label={category} preffix={<Icon icon="figmaLogo" />} theme="primary" />
						</li>
					);
				})}
			</ul>
		</>
	);
};
