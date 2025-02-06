import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Accordion } from '@/shared/ui/Accordion';
import { Text } from '@/shared/ui/Text';

import { Question } from '@/entities/question';

import { QuestionPreview } from '../QuestionPreview/QuestionPreview';
import { DisplayMode } from '../QuestionsFilterPanel/model/types';

import styles from './QuestionsSummaryList.module.css';

interface QuestionsListProps {
	questions?: Question[];
	profileId?: string;
	displayMode?: DisplayMode;
	additionalTitle?: string;
}

export const QuestionsSummaryList = ({
	questions,
	displayMode = 'popover',
	additionalTitle,
}: QuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const title = additionalTitle
		? `${t(Questions.TITLE_SHORT)} ${additionalTitle}`
		: t(Questions.TITLE_SHORT);

	return (
		<>
			<Text variant="body6" maxRows={1} isMainTitle className={styles.title}>
				{title}
			</Text>
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
