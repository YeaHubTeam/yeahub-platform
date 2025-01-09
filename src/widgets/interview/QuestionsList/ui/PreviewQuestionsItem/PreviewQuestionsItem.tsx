import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { Text } from '@/shared/ui/Text';

import { Question } from '@/entities/question';

import styles from './PreviewQuestionsItem.module.css';

interface PreviewQuestionsItemProps {
	question: Question;
}

export const PreviewQuestionsItem = ({ question }: PreviewQuestionsItemProps) => {
	const { id, imageSrc, title, rate, complexity = 0 } = question;

	const { t } = useTranslation(i18Namespace.questions);

	return (
		<li className={styles.item}>
			<Link to={route(ROUTES.interview.questions.detail.page, id)} className={styles.link}>
				<ImageWithWrapper src={imageSrc} className={styles.image} />
				<Flex direction="column" gap="8">
					<Text variant="body2-accent" maxRows={1} className={styles.title}>
						{title}
					</Text>
					<Flex componentType="ul" gap="24" className={styles.params}>
						<QuestionParam label={t(Questions.RATE_TITLE_SHORT)} value={rate} />
						<QuestionParam label={t(Questions.COMPLEXITY_TITLE_SHORT)} value={complexity} />
					</Flex>
				</Flex>
			</Link>
		</li>
	);
};
