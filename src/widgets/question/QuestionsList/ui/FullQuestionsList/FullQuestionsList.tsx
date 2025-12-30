import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Accordion } from '@/shared/ui/Accordion';
import { Text } from '@/shared/ui/Text';

import { Question } from '@/entities/question';

import { FullQuestionItem } from '../FullQuestionItem/FullQuestionItem';

import styles from './FullQuestionsList.module.css';

interface FullQuestionsListProps {
	questions: Question[];
	isPublic?: boolean;
	additionalTitle?: string;
	filterButton?: ReactNode;
	onMoveQuestionDetail: (id: number) => void;
}

export const FullQuestionsList = ({
	questions,
	isPublic,
	additionalTitle,
	filterButton,
	onMoveQuestionDetail,
}: FullQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile, isMobileS, isTablet } = useScreenSize();

	const title = additionalTitle
		? `${t(Questions.TITLE_SHORT)} ${additionalTitle}`
		: t(Questions.TITLE_SHORT);

	return (
		<>
			<div className={styles['questions-list-header']}>
				<Text variant={isMobileS ? 'body5-accent' : 'body6'} isMainTitle maxRows={1}>
					{title}
				</Text>
				{(isMobile || isTablet) && filterButton}
			</div>
			<hr className={styles.divider} />
			{questions.map((question) => (
				<Accordion key={question.id} title={question.title} className={styles.gap}>
					<FullQuestionItem
						question={question}
						isPublic={isPublic}
						onMoveQuestionDetail={onMoveQuestionDetail}
					/>
				</Accordion>
			))}
		</>
	);
};
