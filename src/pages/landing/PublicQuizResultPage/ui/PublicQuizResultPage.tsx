import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CategoryProgressListWrap } from '@/widgets/interview/CategoryProgressList';
import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { PassedQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';

import { useQuizStatic } from '@/pages/landing/PublicQuizResultPage/model/hooks/useQuizStatic';
import { PublicQuizResultPageSkeleton } from '@/pages/landing/PublicQuizResultPage/ui/PublicQuizResultPage.skeleton';

import { usePublicQuizResultData } from '../model/hooks/usePublicQuizResultData';

import styles from './PublicQuizResultPage.module.css';

const PublicQuizResultPage = () => {
	const { quizAnswers, isLoading } = usePublicQuizResultData();
	const { t } = useTranslation(i18Namespace.landing);
	const { isMobile, isTablet } = useScreenSize();
	const { quizResults, isLoading: loadingResult } = useQuizStatic();

	if (isLoading || loadingResult) return <PublicQuizResultPageSkeleton />;

	return (
		<Flex gap="20" direction="column">
			<Card title={t(Landing.TITLE_STATISTIC)} actionTitle={t(Landing.LINK_STAT)} actionRoute={'/'}>
				<Flex gap="20" direction={isTablet || isMobile ? 'column' : 'row'}>
					<PassedQuestionsStatistic total={quizResults!.total} className={styles.statistic} />
					<CategoryProgressListWrap quizResults={quizResults!} className={styles.progress} />
				</Flex>
			</Card>
			<PassedQuestionsList className={styles['questions-list']} questions={quizAnswers || []} />
		</Flex>
	);
};

export default PublicQuizResultPage;
