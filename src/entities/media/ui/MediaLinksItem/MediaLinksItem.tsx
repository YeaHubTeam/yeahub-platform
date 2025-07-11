import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Media } from '@/shared/config/i18n/i18nTranslations';
import { Chip } from '@/shared/ui/Chip';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Media as MediaInterface } from '../../model/types/media';

import styles from './MediaLinksItem.module.css';

type MediaLinksItemProps = {
	mediaLink: MediaInterface;
};
export const MediaLinksItem = ({ mediaLink }: MediaLinksItemProps) => {
	const { t } = useTranslation(i18Namespace.media);
	return (
		<Chip
			className={styles.container}
			variant="big"
			label={
				<Text variant="body3-accent" color="black-800" className={styles['container-text']}>
					{t(Media.MEDIA_LINK_START)}
					<a href={mediaLink.link} color="purple-700" target="_blank" rel="noopener noreferrer">
						{mediaLink.title}
					</a>
					{t(Media.MEDIA_LINK_END)}
				</Text>
			}
			prefix={<Icon icon="telegramWithBackground" color="purple-700" />}
		/>
	);
};
