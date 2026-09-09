import { useTranslation } from 'react-i18next';

import growthChartImage from '@/shared/assets/images/growthChart.png';
import { Vacancies, i18Namespace } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';

import { ItemInfo } from '../ItemInfo/ItemInfo';

import styles from './AnalysisInfo.module.css';

interface AnalysisInfoProps {
	fileName: string;
	analyzedAt: string;
	analyzedVacancyCount: number;
}

export const AnalysisInfo = ({ fileName, analyzedAt, analyzedVacancyCount }: AnalysisInfoProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<div className={styles.container}>
				<ItemInfo
					icon={<Icon icon="downloadFile" color="purple-700" className={styles.img} size={30} />}
					title={t(Vacancies.RESUME_ANALYZER_INFO_TITLE)}
					value={fileName}
					description={t(Vacancies.RESUME_ANALYZER_INFO_UPLOADED, { date: analyzedAt })}
				/>
				<ItemInfo
					icon={<img src={growthChartImage} alt="" width={30} height={30} />}
					value={
						<>
							<span>{t(Vacancies.RESUME_ANALYZER_INFO_ANALYZED)}</span>
							<span>
								{t(Vacancies.RESUME_ANALYZER_INFO_COUNT, { count: analyzedVacancyCount })}
							</span>
						</>
					}
					description={t(Vacancies.RESUME_ANALYZER_INFO_UPDATED)}
				/>
			</div>
		</Card>
	);
};
