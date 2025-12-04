/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { AuthAvatarFrame } from '@/shared/ui/AuthAvatarFrame';

import styles from './AuthorizedBlock.module.css';

interface UserProfileProps {
	username: string;
	avatarURL: string | null;
}

export const AuthorizedBlock = ({ username, avatarURL }: UserProfileProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(ROUTES.platformRoute);
	};

	return (
		<div data-testid="AuthorizedBlock_Wrapper" className={styles.wrapper}>
			<div
				data-testid="UserWrapper"
				role="banner"
				className={styles['user-wrapper']}
				onClick={handleClick}
			>
				<p data-testid="UserName" className={styles['user-name']}>
					{username}
				</p>
				<AuthAvatarFrame link={avatarURL || null} />
			</div>
		</div>
	);
};
