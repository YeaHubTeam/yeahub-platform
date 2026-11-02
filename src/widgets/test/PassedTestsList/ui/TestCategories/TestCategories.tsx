import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './TestCategories.module.css';

interface TestCategoriesProps {
	testCategories: string[];
}

export const TestCategories = ({ testCategories }: TestCategoriesProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<Flex gap="8" direction="column">
			<Text variant="body2" color="black-700">
				{t(Questions.SKILLS_TITLE)}
			</Text>
			<ul className={styles.list}>
				{testCategories?.map((category) => {
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
