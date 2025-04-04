import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Question from '@/shared/assets/icons/collectionsQuestion.svg';
import Star from '@/shared/assets/icons/starsMinimalistic.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Card } from '@/shared/ui/Card';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import styles from './CollectionPreview.module.css';

type CollectionProps = {
	collection: Collection;
};

export const CollectionPreview = ({ collection }: CollectionProps) => {
	const { id, title, isFree, imageSrc, questionsCount, keywords, specializations } = collection;

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const accessText = {
		free: t(Collections.TARIFF_FREE, { ns: i18Namespace.collection }),
		paid: t(Collections.TARIFF_PAID, { ns: i18Namespace.collection }),
	};

	return (
		<Card withOutsideShadow>
			<Link to={route(ROUTES.interview.collections.detail.page, id)} className={styles.wrapper}>
				<ImageWithWrapper
					src={imageSrc}
					alt={t(Collections.IMAGE_ALT, { ns: i18Namespace.collection })}
					className={styles['image-wrapper']}
				/>
				<div className={styles['wrapper-content']}>
					<div className={styles.header}>
						<ul className={styles['header-params']}>
							{keywords?.map((keyword) => (
								<StatusChip key={keyword} status={{ text: keyword, variant: 'green' }} />
							))}
						</ul>
					</div>

					<Text variant={'body3-accent'}>{title}</Text>
					<div className={styles['access-container']}>
						<div className={styles['access-item']}>
							{!isFree && <Star />}
							<Text variant={'body3-accent'}>{accessText[isFree ? 'free' : 'paid']}</Text>
						</div>
						{!!questionsCount && (
							<div className={styles['access-item']}>
								<Question />
								<Text variant={'body3-accent'}>
									{t(Collections.QUESTIONS_COUNT, {
										ns: i18Namespace.collection,
										count: questionsCount,
									})}
								</Text>
							</div>
						)}
					</div>
					<div className={styles['specialization-container']}>
						{specializations?.map((spec) => (
							<Text variant={'body3-accent'} key={spec.id}>
								{spec.title}
							</Text>
						))}
					</div>
				</div>
			</Link>
		</Card>
	);
};
