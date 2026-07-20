import { useTranslation } from 'react-i18next';

import Hh from '@/shared/assets/images/hh.png';
import { Vacancies, i18Namespace } from '@/shared/config';
import { useGetCurrentDay } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Vacancy } from '@/entities/vacancy';

import styles from './VacancySource.module.css';

interface VacancySourceProps {
	source: Vacancy['source'];
	publishDate: Vacancy['publishedAt'];
	workFormat: Vacancy['workFormat'];
	internship: Vacancy['internship'];
}

export const VacancySource = ({
	source,
	publishDate,
	internship,
	workFormat,
}: VacancySourceProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const formattedDate = useGetCurrentDay(publishDate);

	const sourceImg: Record<NonNullable<Vacancy['source']>, string | ''> = {
		hh: Hh,
		habr: '',
		anonymous: '',
		hr: '',
		telegram: '',
		company_site: '',
	};

	const infoItems = [
		{
			label: t(Vacancies.SOURCE_TITLE),
			value: source ? `${source}.ru` : '-',
			icon: source && sourceImg[source] ? <img src={sourceImg[source]} alt={source} /> : null,
		},
		{
			label: t(Vacancies.SOURCE_DATE_ADDED),
			value: formattedDate,
		},
		{
			label: t(Vacancies.SOURCE_FORMAT),
			value: workFormat?.length ? workFormat.join(', ') : '-',
			icon: <Icon size={20} icon="wifi" color="green-900" />,
		},
		{
			label: t(Vacancies.SOURCE_INTERNSHIP_TITLE),
			value: internship ? t(Vacancies.SOURCE_INTERNSHIP_YES) : t(Vacancies.SOURCE_INTERNSHIP_NO),
			icon: <Icon size={20} icon="bagSimple" color="green-900" />,
		},
	];

	return (
		<Card withOutsideShadow className={styles.container}>
			<Flex justify="between" className={styles.items}>
				{infoItems.map((item) => (
					<Flex gap="8" direction="column" key={item.label} className={styles.item}>
						<Text variant="body3-accent" color="black-400">
							{item.label}
						</Text>
						<Flex gap="8" align="center">
							{item.icon}
							<Text variant="body2-accent" color="black-900">
								{item.value}
							</Text>
						</Flex>
					</Flex>
				))}
			</Flex>
		</Card>
	);
};
