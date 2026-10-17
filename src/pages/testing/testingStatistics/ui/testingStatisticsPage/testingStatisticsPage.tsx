import { useTranslation } from 'react-i18next';

import {
	i18Namespace,
	InterviewStatistics,
	Profile,
	ROUTES,
	Subscription,
	TestQuestions,
} from '@/shared/config';
import {
	EMAIL_VERIFY_SETTINGS_TAB,
	SELECT_TARIFF_SETTINGS_TAB,
	useAppSelector,
} from '@/shared/libs';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { getHasPremiumAccess, getIsVerified, getProfileId } from '@/entities/profile';
import { useGetProfileStatisticQuery } from '@/entities/testQuestion';

import { getQuestionsStats } from '../../lib/getQuestionsStats/getQuestionsStats';

import styles from './testingStatisticsPage.module.css';

const TestingStatisticsPage = () => {
	const { t } = useTranslation([
		i18Namespace.testQuestion,
		i18Namespace.interviewStatistics,
		i18Namespace.profile,
		i18Namespace.subscription,
	]);
	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsVerified);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const { data: profileStats } = useGetProfileStatisticQuery(profileId, {
		skip: !(hasPremium && isEmailVerified),
	});
	const questionStats = getQuestionsStats(profileStats?.questionsStat);
	const statsActionTitleKey = !isEmailVerified
		? t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile })
		: !hasPremium
			? t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription })
			: t(InterviewStatistics.LINK, { ns: i18Namespace.interviewStatistics });
	const statsActionRoute = !isEmailVerified
		? EMAIL_VERIFY_SETTINGS_TAB
		: !hasPremium
			? SELECT_TARIFF_SETTINGS_TAB
			: ROUTES.interview.statistic.page;
	const allQuestion = profileStats?.questionsStat?.uniqueQuestionsCount;
	const newQuestion = profileStats?.questionsStat?.unlearnedQuestionsCount;
	const newUser = allQuestion === newQuestion;
	return (
		<AdditionalStatInfoGauge
			isActionPositionBottom
			className={styles.statistics}
			title={t(TestQuestions.STATS_TITLE, { ns: i18Namespace.testQuestion })}
			actionTitle={statsActionTitleKey}
			actionRoute={statsActionRoute}
			actionDisabled={isEmailVerified && hasPremium && newUser}
			statsInfo={questionStats}
			total={profileStats?.questionsStat?.uniqueQuestionsCount ?? 0}
			learned={profileStats?.questionsStat?.learnedQuestionsCount ?? 0}
		/>
	);
};

export default TestingStatisticsPage;
