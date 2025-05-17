import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Question from '@/shared/assets/icons/collectionsQuestion.svg';
import Star from '@/shared/assets/icons/starsMinimalistic.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import styles from './CollectionPreview.module.css';

type CollectionProps = {
	collection: Collection;
	variant?: 'row' | 'column';
};

export const CollectionPreview = ({ collection, variant = 'row' }: CollectionProps) => {
	const { id, title, isFree, imageSrc, questionsCount, keywords, specializations, company } =
		collection;

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const accessText = {
		free: t(Collections.TARIFF_FREE, { ns: i18Namespace.collection }),
		paid: t(Collections.TARIFF_PAID, { ns: i18Namespace.collection }),
	};

	return (
		<Card withOutsideShadow className={styles.content}>
			<Link
				to={route(ROUTES.interview.collections.detail.page, id)}
				className={classnames(styles.wrapper, styles[variant])}
			>
				<ImageWithWrapper
					src={imageSrc || company?.imageSrc}
					alt={t(Collections.IMAGE_ALT, { ns: i18Namespace.collection })}
					className={classnames(styles['image-wrapper'], styles[variant])}
				/>
				<Flex direction="column" gap="16">
					<div className={styles.header}>
						<ul className={styles.tags}>
							{keywords?.map((keyword) => (
								<StatusChip key={keyword} status={{ text: keyword, variant: 'green' }} />
							))}
						</ul>
					</div>

					<Flex direction="column" gap="20">
						<Text
							className={classnames(styles['card-title'], styles[variant])}
							variant={'body3-accent'}
							maxRows={2}
						>
							{title}
						</Text>
						<div className={styles['access-container']}>
							<div className={styles['access-item']}>
								{!isFree && <Star />}
								<Text variant={'body2'} color="purple-700">
									{accessText[isFree ? 'free' : 'paid']}
								</Text>
							</div>
							{!!questionsCount && (
								<div className={styles['access-item']}>
									<Question />
									<Text variant={'body2'} color="purple-700">
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
					</Flex>
				</Flex>
			</Link>
		</Card>
	);
};
