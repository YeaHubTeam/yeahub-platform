import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics, ROUTES } from '@/shared/config';
import { Card } from '@/shared/ui/Card';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import { ITEMS_COUNT } from '../../lib/constants/specializationProgress';

import styles from './SpecializationProgressWidget.module.css';
import { SpecializationProgressWidgetSkeleton } from './SpecializationProgressWidget.skeleton';

export const SpecializationProgressWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const { data: specializationsProgress, isLoading } = useGetSpecializationsGeneralProgressQuery({
		limit: ITEMS_COUNT,
	});

	if (isLoading) return <SpecializationProgressWidgetSkeleton />;

	if (!specializationsProgress?.data) {
		return null;
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
