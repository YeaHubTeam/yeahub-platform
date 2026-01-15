import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Analytics, ROUTES } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Stub } from '@/shared/ui/Stub';

import { getIsVerified } from '@/entities/profile';
import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { ITEMS_COUNT } from '../../model/constants';

import styles from './SpecializationProgressWidget.module.css';
import { SpecializationProgressWidgetSkeleton } from './SpecializationProgressWidget.skeleton';

export const SpecializationProgressWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const navigate = useNavigate();
	const isVerified = useAppSelector(getIsVerified);

	const {
		data: specializationsProgress,
		isLoading,
		error,
		refetch,
	} = useGetSpecializationsGeneralProgressQuery({
		limit: ITEMS_COUNT,
	});

	if (isLoading) return <SpecializationProgressWidgetSkeleton />;

	if (isVerified) {
		return (
			<Card
				classNameContent={styles.table}
				actionRoute={ROUTES.analytics.progressSpecializations.route}
				title={t(Analytics.SPECIALIZATION_PROGRESS_TITLE)}
				isActionPositionBottom
			>
				<Stub type="access-denied-verify" onClick={() => navigate(EMAIL_VERIFY_SETTINGS_TAB)} />
			</Card>
		);
	}

	if (error) {
		return (
			<Card
				classNameContent={styles.table}
				actionRoute={ROUTES.analytics.progressSpecializations.route}
				title={t(Analytics.SPECIALIZATION_PROGRESS_TITLE)}
				isActionPositionBottom
			>
				<Stub type="error" onClick={() => refetch()} />
			</Card>
		);
	}

	if (!specializationsProgress?.data) {
		return (
			<Card
				classNameContent={styles.table}
				actionRoute={ROUTES.analytics.progressSpecializations.route}
				title={t(Analytics.SPECIALIZATION_PROGRESS_TITLE)}
				isActionPositionBottom
			>
				<Stub type="empty" />
			</Card>
		);
	}

	return (
		<Card
			classNameContent={styles.table}
			actionRoute={ROUTES.analytics.progressSpecializations.route}
			title={t(Analytics.SPECIALIZATION_PROGRESS_TITLE)}
			isActionPositionBottom
		>
			<SpecializationProgressTable
				isWidget
				specializationsProgress={specializationsProgress.data}
			/>
		</Card>
	);
};
