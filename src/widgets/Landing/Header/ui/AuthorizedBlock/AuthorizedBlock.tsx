/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { AuthAvatarFrame } from '@/shared/ui/AuthAvatarFrame';

import styles from './AuthorizedBlock.module.css';

interface UserProfileProps {
	firstName: string;
	avatarURL: string | null;
}

export const AuthorizedBlock = ({ firstName, avatarURL }: UserProfileProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(ROUTES.platformRoute);
	};

	return (
		<div className={styles.wrapper}>
			<div role="banner" className={styles['user-wrapper']} onClick={handleClick}>
				<p className={styles['user-name']}>{firstName}</p>
				<AuthAvatarFrame link={avatarURL || ''} />
			</div>
		</div>
	);
};
