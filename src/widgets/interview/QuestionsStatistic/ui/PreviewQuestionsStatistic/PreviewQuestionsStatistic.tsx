import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics, Profile, Subscription } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { getHasPremiumAccess, getIsEmailVerified, getProfileId } from '@/entities/profile';
import { useGetProfileQuizStatsQuery } from '@/entities/quiz';

import { getQuestionsStats } from '../../model/lib/getQuestionsStats/getQuestionsStats';

export interface PreviewQuestionsStatisticProps {
	className?: string;
}

export const PreviewQuestionsStatistic = ({ className }: PreviewQuestionsStatisticProps) => {
	const { t } = useTranslation([
		i18Namespace.interviewStatistics,
		i18Namespace.profile,
		i18Namespace.subscription,
	]);
	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsEmailVerified);

	const { data: profileStats } = useGetProfileQuizStatsQuery(profileId);

	const questionStats = getQuestionsStats(profileStats?.questionsStat);

	const allQuestion = profileStats?.questionsStat.uniqueQuestionsCount;
	const newQuestion = profileStats?.questionsStat.unlearnedQuestionsCount;
	const newUser = allQuestion === newQuestion;

	const hasPremium = useAppSelector(getHasPremiumAccess);

	const statsActionTitleKey = !isEmailVerified
		? t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile })
		: !hasPremium
			? t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription })
			: t(InterviewStatistics.LINK);

	const statsActionRoute = !isEmailVerified ? EMAIL_VERIFY_SETTINGS_TAB : ROUTES.settings.page;

	return (
		<AdditionalStatInfoGauge
			className={className}
			isActionPositionBottom
			title={t(InterviewStatistics.QUESTION_STATS_TITLE_SHORT)}
			actionTitle={statsActionTitleKey}
			actionRoute={statsActionRoute}
			actionDisabled={isEmailVerified && newUser && hasPremium}
			statsInfo={questionStats}
			total={profileStats?.questionsStat?.uniqueQuestionsCount ?? 0}
			learned={profileStats?.questionsStat?.learnedQuestionsCount ?? 0}
		/>
	);
};
