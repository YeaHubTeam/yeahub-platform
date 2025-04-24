import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { AvatarGroup } from '../AvatarGroup/AvatarGroup';
import { BannerButton } from '../BannerButton/BlockTitle/BannerButton';
import { BlockDescription } from '../BlockDescription/BlockDescription';
import { BlockTitle } from '../BlockTitle/BlockTitle';
import { Sticker } from '../Sticker/Sticker';

import styles from './BannerContent.module.css';

export const BannerContent = () => {
	const { t } = useTranslation(i18Namespace.landing);
	return (
		<Flex direction="column" justify="between" className={styles['content-block']}>
			<Sticker text={t(Landing.BANNER_STICKER_SKILL)} classNames={styles['sticker-skill']} />
			<Flex direction="column" className={styles['content-wrapper']}>
				<AvatarGroup />
				<BlockTitle />
				<BlockDescription />
				<BannerButton />
			</Flex>
		</Flex>
	);
};
