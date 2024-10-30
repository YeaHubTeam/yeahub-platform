/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Button } from 'yeahub-ui-kit';

import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AuthAvatarFrame } from '@/shared/ui/AuthAvatarFrame';

import { Logout } from '@/features/authentication/logout/Logout';

import styles from './AuthorizedBlock.module.css';

interface UserProfileProps {
	firstName: string;
	avatarURL: string | null;
}

export const AuthorizedBlock = ({ firstName, avatarURL }: UserProfileProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useI18nHelpers(i18Namespace.landing);

	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.wrapper}>
			<div role="banner" className={styles['user-wrapper']} onClick={handleDropdownClick}>
				<p className={styles['user-name']}>{firstName}</p>
				<AuthAvatarFrame link={avatarURL || ''} />
			</div>
			{isOpen && (
				<div className={styles.dropdown}>
					<div className={styles['button-wrapper']}>
						<ProfileIcon className={styles.icon} />
						<Button tagName="a" theme="link" className={styles.button}>
							{t(Landing.MY_PROFILE)}
						</Button>
					</div>
					<Logout />
				</div>
			)}
		</div>
	);
};
