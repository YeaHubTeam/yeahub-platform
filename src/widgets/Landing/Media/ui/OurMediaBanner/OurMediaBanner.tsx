import { useTranslation } from 'react-i18next';

import Books from '@/shared/assets/images/books.png';
import { i18Namespace, Media } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './OurMediaBanner.module.css';

export const OurMediaBanner = () => {
	const { t } = useTranslation(i18Namespace.media);
	const { isMobile } = useScreenSize();

	return (
		<Flex
			className={styles['intro']}
			justify="between"
			align="center"
			direction={isMobile ? 'column' : 'row'}
		>
			<Flex direction="column" gap="12" justify="center" className={styles['intro-text-wrapper']}>
				<Text variant={isMobile ? 'head5' : 'head3'} isMainTitle>
					{t(Media.MEDIA_INTRODUCTION_TITLE)}
				</Text>
				<Text variant="body3" className={styles['intro-description']}>
					{t(Media.MEDIA_INTRODUCTION_DESCRIPTION)}
				</Text>
			</Flex>
			<img src={Books} className={styles['books-img']} alt="" />
		</Flex>
	);
};
