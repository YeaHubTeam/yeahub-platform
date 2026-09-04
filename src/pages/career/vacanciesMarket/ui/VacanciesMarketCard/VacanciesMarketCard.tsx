import { useTranslation } from 'react-i18next';

import { i18Namespace, VacanciesMarket } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Icon } from '@/shared/ui/Icon';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { VacanciesMarketSpecialization } from '../../model/types/vacanciesMarket';

import styles from './VacanciesMarketCard.module.css';

interface VacanciesMarketCardProps {
	specialization: VacanciesMarketSpecialization;
}

const normalizePercent = (percent: number) => Math.min(Math.max(percent, 0), 100);
const capitalizeFirstLetter = (value: string) =>
	value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;

export const VacanciesMarketCard = ({ specialization }: VacanciesMarketCardProps) => {
	const { t, i18n } = useTranslation(i18Namespace.vacanciesMarket);
	const numberFormatter = new Intl.NumberFormat(i18n.resolvedLanguage ?? i18n.language);
	const { name, vacancyCount, topSkills, topKeywords } = specialization;

	return (
		<Card className={styles.card} withOutsideShadow>
			<div className={styles.content}>
				<header className={styles.header}>
					<h2 className={styles.title}>{name || t(VacanciesMarket.UNKNOWN_SPECIALIZATION)}</h2>
					<Text variant="body5-accent" color="purple-700">
						{t(VacanciesMarket.VACANCIES, {
							count: vacancyCount,
							formattedCount: numberFormatter.format(vacancyCount),
						})}
					</Text>
				</header>

				<div className={styles.analytics}>
					<section className={styles.skills}>
						<Text variant="body3-accent" color="black-500" className={styles['section-title']}>
							{t(VacanciesMarket.TOP_SKILLS)}
						</Text>
						<ul className={styles['skills-list']}>
							{topSkills.slice(0, 5).map((skill, index) => {
								const percent = normalizePercent(skill.percent);

								return (
									<li key={`${skill.title}-${index}`}>
										<div className={styles['skill-label']}>
											<Text variant="body3-accent">{skill.title}</Text>
											<Text variant="body3-accent">{Math.round(percent)}%</Text>
										</div>
										<ProgressBar
											className={styles.progress}
											currentCount={percent}
											totalCount={100}
											variant="medium"
										/>
									</li>
								);
							})}
						</ul>
					</section>

					<section className={styles.keywords}>
						<Text variant="body3-accent" color="black-500" className={styles['section-title']}>
							{t(VacanciesMarket.KEYWORDS)}
						</Text>
						<ul className={styles['keywords-list']}>
							{topKeywords.map((keyword, index) => (
								<li key={`${keyword.title}-${index}`}>
									<Chip label={capitalizeFirstLetter(keyword.title)} className={styles.keyword} />
								</li>
							))}
						</ul>
					</section>
				</div>

				<div className={styles.details} aria-hidden="true">
					<Text variant="body3-accent" color="purple-700">
						{t(VacanciesMarket.DETAILS)}
					</Text>
					<Icon icon="arrowRight" size={24} />
				</div>
			</div>
		</Card>
	);
};
