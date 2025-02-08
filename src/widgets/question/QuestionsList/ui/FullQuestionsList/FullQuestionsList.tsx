import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Accordion } from '@/shared/ui/Accordion';
import { Text } from '@/shared/ui/Text';

import { Question } from '@/entities/question';

import { FullQuestionItem } from '../FullQuestionItem/FullQuestionItem';

import styles from './FullQuestionsList.module.css';

interface FullQuestionsListProps {
	questions: Question[];
	isPublic?: boolean;
}

export const FullQuestionsList = ({ questions, isPublic }: FullQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobileS } = useScreenSize();

	return (
		<>
			<Text variant={isMobileS ? 'body5-accent' : 'body6'}>{t(Questions.TITLE_SHORT)}</Text>
			<hr className={styles.divider} />
			{questions.map((question) => (
				<Accordion key={question.id} title={question.title}>
					<FullQuestionItem question={question} isPublic={isPublic} />
				</Accordion>
			))}
		</>
	);
};
