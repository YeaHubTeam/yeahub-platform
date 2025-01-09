import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics, Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { getIsEmailVerified, getProfileId } from '@/entities/profile';
import { useGetProfileQuizStatsQuery } from '@/entities/quiz';

import { getQuestionsStats } from '../../model/lib/getQuestionsStats/getQuestionsStats';

export interface PreviewQuestionsStatisticProps {
	className?: string;
}

export const PreviewQuestionsStatistic = ({ className }: PreviewQuestionsStatisticProps) => {
	const { t } = useTranslation([i18Namespace.interviewStatistics, i18Namespace.profile]);
	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsEmailVerified);

	const { data: profileStats } = useGetProfileQuizStatsQuery(profileId);

	const questionStats = getQuestionsStats(profileStats?.questionsStat);

	const allQuestion = profileStats?.questionsStat.uniqueQuestionsCount;
	const newQuestion = profileStats?.questionsStat.unlearnedQuestionsCount;
	const newUser = allQuestion === newQuestion;

	const statsActionTitleKey = !isEmailVerified
		? t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile })
		: t(InterviewStatistics.LINK);

	const statsActionRoute = !isEmailVerified
		? EMAIL_VERIFY_SETTINGS_TAB
		: ROUTES.interview.statistic.page;

	return (
		<AdditionalStatInfoGauge
			className={className}
			isActionPositionBottom
			title={t(InterviewStatistics.QUESTION_STATS_TITLE_SHORT)}
			actionTitle={statsActionTitleKey}
			actionRoute={statsActionRoute}
			actionDisabled={isEmailVerified && newUser}
			statsInfo={questionStats}
			total={profileStats?.questionsStat?.uniqueQuestionsCount ?? 0}
			learned={profileStats?.questionsStat?.learnedQuestionsCount ?? 0}
		/>
	);
};
