import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Accordion } from '@/shared/ui/Accordion';

import { Question } from '@/entities/question';

import { QuestionPreview } from '../QuestionPreview/QuestionPreview';
import { DisplayMode } from '../QuestionsFilterPanel/model/types';

import styles from './QuestionsSummaryList.module.css';

interface QuestionsListProps {
	questions?: Question[];
	profileId?: string;
	displayMode?: DisplayMode;
}

export const QuestionsSummaryList = ({
	questions,
	displayMode = 'popover',
}: QuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<>
			<h1 className={styles.title}>{t(Questions.TITLE_SHORT)}</h1>
			<hr className={styles.divider} />

			{questions &&
				questions.map((question) => (
					<Accordion key={question.id} title={question.title}>
						<QuestionPreview question={question} displayMode={displayMode} />
					</Accordion>
				))}
		</>
	);
};
