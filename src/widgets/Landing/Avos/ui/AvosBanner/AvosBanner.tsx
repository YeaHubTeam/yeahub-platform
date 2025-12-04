import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { avosAndYeahubLogo } from '../../model/assets';

import styles from './AvosBanner.module.css';

export const AvosBanner = () => {
	const { isMobileM, isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex direction="column" className={styles['avos-banner']}>
			<Flex
				justify="between"
				className={styles.content}
				direction={isSmallScreen ? 'column-reverse' : 'row'}
				gap={isSmallScreen ? '12' : undefined}
			>
				<div className={styles.promo}>
					<Text variant="body3" color={'black-30'}>
						{!isMobileM && t(Landing.AVOS_SUBTITLE)} {t(Landing.AVOS_INTERVIEWS)}
					</Text>
					<Text
						variant={isMobileM ? 'body5-accent' : 'head3'}
						color={'black-30'}
						isMainTitle
						className={styles.title}
					>
						{t(Landing.AVOS_TITLE)}
					</Text>
				</div>
				<img
					src={avosAndYeahubLogo}
					alt="Avos and Yeahub logo"
					className={styles.logo}
					loading="lazy"
				/>
			</Flex>
		</Flex>
	);
};
