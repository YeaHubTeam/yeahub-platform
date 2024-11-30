import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Accordion } from '@/shared/ui/Accordion';

import { Question } from '@/entities/question';

import { QuestionPreview } from '../QuestionPreview/QuestionPreview';

import styles from './QuestionsSummaryList.module.css';

interface QuestionsListProps {
	questions?: Question[];
	profileId?: string;
}

export const QuestionsSummaryList = ({ questions }: QuestionsListProps) => {
	const { t } = useI18nHelpers(i18Namespace.questions);

	return (
		<>
			<h1 className={styles.title}>{t('title')}</h1>
			<hr className={styles.divider} />

			{questions &&
				questions.map((question) => (
					<Accordion key={question.id} title={question.title}>
						<QuestionPreview question={question} />
					</Accordion>
				))}
		</>
	);
};
