import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import Star from '@/shared/assets/icons/starsMinimalistic.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import styles from './AdditionalInfo.module.css';

interface AdditionalInfoProps {
	collection?: Collection;
	className?: string;
}

export const AdditionalInfo = ({ collection, className }: AdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	const accessText = {
		free: t(Collections.TARIFF_FREE, { ns: i18Namespace.collection }),
		paid: t(Collections.TARIFF_PAID, { ns: i18Namespace.collection }),
	};

	return (
		<Card className={classnames(styles.wrapper, className)}>
			<Flex direction="column" gap="24">
				<div>
					<Text variant="body3" color="black-700" className={styles.title}>
						{t(Collections.TAGS_TITLE)}
					</Text>
					<div className={styles['keywords-wrapper']}>
						{collection?.keywords?.map((keyword) => (
							<StatusChip key={keyword} status={{ text: keyword, variant: 'green' }} />
						))}
					</div>
				</div>
				<div>
					<Text variant="body3" color="black-700" className={styles.title}>
						{t(Collections.SPECIALIZATION_TITLE)}
					</Text>
					<ul className={styles['param-wrapper']}>
						{collection?.specializations?.map((spec) => (
							<li key={spec.id}>
								<Chip className={styles.chip} label={spec.title} />
							</li>
						))}
					</ul>
				</div>
				{collection?.company && (
					<div>
						<Text variant="body3" color="black-700" className={styles.title}>
							{t(Collections.COMPANY_TITLE)}
						</Text>
						<Chip
							variant="big"
							label={collection?.company.title}
							prefix={
								collection.company.imageSrc && (
									<img src={collection.company.imageSrc} alt={collection.company.title} />
								)
							}
							className={styles.chip}
						/>
					</div>
				)}
				<div>
					<Text variant="body3" color="black-700" className={styles.title}>
						{t(Collections.ADDITIONAL_INFO_ACCESS)}
					</Text>
					{collection?.isFree ? (
						<Chip className={styles.chip} label={accessText.free} />
					) : (
						<Chip
							variant="big"
							label={accessText.paid}
							prefix={<Star style={{ width: '30px', height: '30px' }} />}
						/>
					)}
				</div>
				<div>
					<Text variant="body3" color="black-700" className={styles.title}>
						{t(Collections.QUESTIONS_ADDITIONAL_INFO)}
					</Text>
					<Chip label={String(collection?.questionsCount)} active className={styles.chip} />
				</div>
			</Flex>
		</Card>
	);
};
