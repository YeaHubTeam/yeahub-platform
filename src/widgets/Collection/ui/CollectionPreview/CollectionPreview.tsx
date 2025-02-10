import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import Star from '@/shared/assets/icons/starsMinimalistic.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { CollectionParam } from '@/shared/ui/CollectionParam';
import { Text } from '@/shared/ui/Text';

import { Collection } from '@/entities/collection';

import { DisplayMode } from '../CollectionsFilterPanel/model/types';

import styles from './CollectionPreview.module.css';

type CollectionProps = {
	collection: Collection;
	profileId?: string;
	displayMode?: DisplayMode;
};

export const CollectionPreview = ({ collection }: CollectionProps) => {
	const { id, title, isFree } = collection;

	const { t } = useTranslation([i18Namespace.translation, i18Namespace.collection]);

	const navigate = useNavigate();

	const headerParams = [
		t(Collections.COLLECTIONS_TITLE, { ns: i18Namespace.collection }),
		t(Collections.COLLECTIONS_TITLE, { ns: i18Namespace.collection }),
		t(Collections.COLLECTIONS_TITLE, { ns: i18Namespace.collection }),
	];

	return (
		<Card withOutsideShadow>
			<div className={styles.wrapper}>
				<div className={styles['image-wrapper']}>
					<img
						className={styles.image}
						alt={t(Collections.IMAGE_ALT, { ns: i18Namespace.collection })}
						src={
							'https://avatars.mds.yandex.net/i?id=1683d076e80887c04421aabf3b0879ee_l-4420695-images-thumbs&n=13'
						}
					/>
					<hr />
				</div>
				<div className={styles['wrapper-content']}>
					<div className={styles.header}>
						<ul className={styles['header-params']}>
							{headerParams.map((param, index) => (
								<CollectionParam key={index} label={param} />
							))}
						</ul>
					</div>

					<Text variant={'body3-accent'}>{title}</Text>
					<div className={styles['access-container']}>
						{!isFree && <Star />}
						<Text variant={'body3-accent'}>{isFree ? 'Для всех' : 'Для участников'}</Text>
					</div>
					<div className={styles['specialization-container']}>
						<Text variant={'body3-accent'}>{title}</Text>
						<Button
							variant="link"
							size="L"
							className={styles.link}
							suffix={<ArrowRight height={24} width={24} />}
							onClick={() => {
								navigate(route(ROUTES.collections.detail.page, id));
							}}
						>
							{t(Collections.COLLECTIONS_DETAIL, { ns: i18Namespace.collection })}
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};
