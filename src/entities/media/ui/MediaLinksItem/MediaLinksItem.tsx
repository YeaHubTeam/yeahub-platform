import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { MediaLink } from '@/shared/config/i18n/i18nTranslations';
import { Chip } from '@/shared/ui/Chip';
import { Icon } from '@/shared/ui/Icon';

import { Media } from '../../model/types/media';

import styles from './MediaLinksItem.module.css';

type MediaLinksItemProps = {
	mediaLink: Media;
};
export const MediaLinksItem = ({ mediaLink }: MediaLinksItemProps) => {
	const { t } = useTranslation(i18Namespace.mediaLink);
	return (
		<Chip
			className={styles.container}
			variant="big"
			label={
				<label className={styles['container-text']}>
					{t(MediaLink.MEDIA_LINK_START)}
					<a href={mediaLink.link} color="purple-700" target="_blank" rel="noopener noreferrer">
						{mediaLink.title}
					</a>
					{t(MediaLink.MEDIA_LINK_END)}
				</label>
			}
			prefix={<Icon icon="telegramWithBackground" color="purple-700" />}
		/>
	);
};
