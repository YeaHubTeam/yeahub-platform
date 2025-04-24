import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { AvatarGroup } from '../AvatarGroup/AvatarGroup';
import { BannerButton } from '../BannerButton/BlockTitle/BannerButton';
import { BlockDescription } from '../BlockDescription/BlockDescription';
import { BlockTitle } from '../BlockTitle/BlockTitle';
import { Sticker } from '../Sticker/Sticker';

import styles from './LeftBlock.module.css';

export const LeftBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<div className={styles['left-block']}>
			<Sticker text={t(Landing.BANNER_STICKER_SKILL)} classNames={styles['sticker-skill']} />
			<div className={styles['content-wrapper']}>
				<AvatarGroup />
				<BlockTitle />
				<BlockDescription />
				<BannerButton />
			</div>
		</div>
	);
};
