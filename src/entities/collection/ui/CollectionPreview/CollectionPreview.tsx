import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Question from '@/shared/assets/icons/collectionsQuestion.svg';
import Star from '@/shared/assets/icons/starsMinimalistic.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useCurrentProject } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Popover } from '@/shared/ui/Popover';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import styles from './CollectionPreview.module.css';

const MAX_LIMIT_KEYWORDS = 4;

type CollectionProps = {
	collection: Collection;
	variant?: 'row' | 'column';
};

export const CollectionPreview = ({ collection, variant = 'row' }: CollectionProps) => {
	const { id, title, isFree, imageSrc, questionsCount, keywords, specializations, company } =
		collection;

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const renderActions = (keywords: string[] | undefined) => {
		return (
			<Popover
				body={
					<ul className={styles.popover}>
						{keywords?.map((item) => (
							<li key={item}>
								{' '}
								<StatusChip status={{ text: item, variant: 'green' }} />
							</li>
						))}
					</ul>
				}
			>
				{({ onToggle }) => (
					<IconButton
						aria-label="go to details"
						form="square"
						icon={<StatusChip status={{ text: '...', variant: 'green' }} />}
						size="medium"
						variant="link"
						onClick={onToggle}
						className={styles.ada}
					/>
				)}
			</Popover>
		);
	};

	const accessText = {
		free: t(Collections.TARIFF_FREE, { ns: i18Namespace.collection }),
		paid: t(Collections.TARIFF_PAID, { ns: i18Namespace.collection }),
	};

	const project = useCurrentProject();

	const isLandingPageVariant = variant === 'column';

	const collectionPath = isLandingPageVariant
		? ROUTES.collections.page
		: project === 'landing'
			? route(ROUTES.collections.detail.page, id)
			: route(ROUTES.interview.collections.detail.page, id);

	return (
		<Card withOutsideShadow className={styles.content}>
			<div className={classnames(styles.wrapper, styles[variant])}>
				<Link to={collectionPath}>
					<ImageWithWrapper
						src={imageSrc || company?.imageSrc}
						alt={t(Collections.IMAGE_ALT, { ns: i18Namespace.collection })}
						className={classnames(styles['image-wrapper'], styles[variant])}
					/>
				</Link>
				<Flex direction="column" gap="16">
					<div className={styles.header}>
						<ul className={styles.tags}>
							{keywords?.map(
								(keyword, index) =>
									index < MAX_LIMIT_KEYWORDS && (
										<li key={keyword}>
											<StatusChip key={keyword} status={{ text: keyword, variant: 'green' }} />
										</li>
									),
							)}
						</ul>
						{keywords &&
							keywords?.length > MAX_LIMIT_KEYWORDS &&
							renderActions(keywords?.slice(MAX_LIMIT_KEYWORDS))}
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
			</div>
		</Card>
	);
};
