import { useTranslation } from 'react-i18next';

import growthChart from '@/shared/assets/images/growthChart.png';
import { i18Namespace, VacanciesMarket } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { useGetVacanciesMarketOverviewQuery } from '../../api/vacanciesMarketApi';
import { VacanciesMarketCard } from '../VacanciesMarketCard/VacanciesMarketCard';

import styles from './VacanciesMarketPage.module.css';

const VacanciesMarketPage = () => {
	const { t, i18n } = useTranslation(i18Namespace.vacanciesMarket);
	const { data, isLoading, isError, refetch } = useGetVacanciesMarketOverviewQuery();
	const numberFormatter = new Intl.NumberFormat(i18n.resolvedLanguage ?? i18n.language);
	const hasData = (data?.specializations.length ?? 0) > 0;
	const updatedAt = data?.updatedAt
		? t(VacanciesMarket.UPDATED_AT, { date: formatDate(new Date(data.updatedAt), 'd.MM.yyyy') })
		: t(VacanciesMarket.UPDATED_AT_UNAVAILABLE);

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(VacanciesMarket.EMPTY_TITLE),
			subtitle: t(VacanciesMarket.EMPTY_SUBTITLE),
		},
		error: {
			onClick: () => refetch(),
		},
	};

	const content = data ? (
		<div className={styles.page}>
			<header className={styles.header}>
				<Text variant="head3" isMainTitle className={styles.title}>
					{t(VacanciesMarket.TITLE)}
				</Text>
				<Text variant="body3-accent" className={styles.description}>
					{t(VacanciesMarket.DESCRIPTION)}
				</Text>
				<div className={styles.updated}>
					<Icon icon="calendarNoDots" size={20} color="purple-700" aria-hidden />
					<Text variant="body3-accent" color="black-500">
						{updatedAt}
					</Text>
				</div>
			</header>

			<section className={styles.summary} aria-label={t(VacanciesMarket.TOTAL_ANALYZED)}>
				<div className={styles['summary-total']}>
					<div className={styles['summary-icon']}>
						<img
							src={growthChart}
							width={44}
							height={44}
							alt=""
							aria-hidden
							className={styles['growth-chart']}
						/>
					</div>
					<div>
						<Text variant="body3-accent">{t(VacanciesMarket.TOTAL_ANALYZED)}</Text>
						<Text variant="body5-accent" color="purple-700">
							{numberFormatter.format(data.totalAnalyzedVacancyCount)}
						</Text>
					</div>
				</div>
				<div className={styles['summary-note']}>
					<Icon icon="info" size={18} />
					<Text variant="body3-accent" color="black-500">
						{t(VacanciesMarket.UPDATED_DAILY)}
					</Text>
				</div>
			</section>

			<ul className={styles.grid}>
				{data.specializations.map((specialization) => (
					<li key={specialization.specializationId}>
						<VacanciesMarketCard specialization={specialization} />
					</li>
				))}
			</ul>
		</div>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			shouldVerify
			stubs={stubs}
			content={content}
		>
			{({ content: pageContent }) => pageContent}
		</PageWrapper>
	);
};

export default VacanciesMarketPage;
