import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Text } from '@/shared/ui/Text';

import { Collection, CollectionTariff } from '@/entities/collection';

import styles from './AdditionalInfo.module.css';

interface AdditionalInfoProps {
	collection: Collection;
	className?: string;
}

export const AdditionalInfo = ({ collection, className }: AdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	const collectionTariffs: Record<CollectionTariff, string> = {
		premium: t(Collections.TARIFF_PAID),
		free: t(Collections.TARIFF_FREE),
	};

	return (
		<Card className={classnames(styles['normal-hight'], className)} withOutsideShadow>
			<div className={styles.wrapper}>
				<Text variant="body3" color="black-700" className={styles.title}>
					{t(Collections.ADDITIONAL_INFO_ACCESS)}
				</Text>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
					<Text variant="body3">{collectionTariffs[collection.tariff]}</Text>
				</div>
			</div>
			<div className={styles.wrapper}>
				<Text variant="body3" color="black-700" className={styles.title}>
					{t(Collections.SPECIALIZATION_TITLE)}:
				</Text>
				<ul className={styles['param-wrapper']}>
					{collection.specializations?.map((spec) => {
						return (
							<li key={spec.id}>
								<Chip
									className={styles.chip}
									label={spec.title}
									theme="primary"
									active
									onClick={() => {}}
								/>
							</li>
						);
					})}
				</ul>
			</div>
			<div className={styles.wrapper}>
				<Text variant="body3" color="black-700" className={styles.title}>
					{t(Collections.KEYWORDS_TITLE)}:
				</Text>
				<div className={styles['keywords-wrapper']}>
					{collection.keywords?.map((keyword) => {
						return (
							<Link
								key={keyword}
								to={`${ROUTES.interview.questions.page}?page=1&status=all&keywords=${keyword}`}
							>{`#${keyword}`}</Link>
						);
					})}
				</div>
			</div>
		</Card>
	);
};
