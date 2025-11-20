import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Card } from '@/shared/ui/Card';

import {
	SpecializationProgressTable,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import styles from './SpecializationProgressWidget.module.css';

export const SpecializationProgressWidget = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const { data: specializationsProgress } = useGetSpecializationsGeneralProgressQuery({ limit: 5 });

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
