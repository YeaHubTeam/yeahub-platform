import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import styles from './UserImageBlock.module.css';

interface UserImageBlockProps {
	avatar?: string;
}

export const UserImageBlock = ({ avatar }: UserImageBlockProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	return (
		<div className={styles['card-image']}>
			{avatar ? (
				<div className={styles['card-avatar']}>
					<img src={avatar} alt={t(Profile.PHOTO_TITLE)} />
				</div>
			) : (
				<div className={styles['card-placeholder']}>
					<AvatarWithoutPhoto />
				</div>
			)}
		</div>
	);
};
