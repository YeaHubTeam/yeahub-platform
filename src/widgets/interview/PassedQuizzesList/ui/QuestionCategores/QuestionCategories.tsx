import { useTranslation } from 'react-i18next';
import { Chip } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './QuestionCategories.module.css';

interface QuestionCategoriesProps {
	questionCategories: string[];
}

export const QuestionCategories = ({ questionCategories }: QuestionCategoriesProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<Flex gap="8" direction="column">
			<Text variant="body2" color="black-700">
				{t(Questions.CATEGORIES_TITLE)}
			</Text>
			<ul className={styles.list}>
				{questionCategories?.map((category) => {
					return (
						<li key={category} className={styles.category}>
							<Chip label={category} theme="primary" />
						</li>
					);
				})}
			</ul>
		</Flex>
	);
};
