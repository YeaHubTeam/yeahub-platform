import { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Icon, IconButton, Text } from 'yeahub-ui-kit';

import Avatar from '@/shared/assets/images/MockAvatar.png';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const navigate = useNavigate();

	const { profileDetail, accessToken } = useAppSelector((state) => state.auth);

	const handleLoginBtn = useCallback(() => navigate('/login'), [navigate]);
	const handleRegisterBtn = useCallback(() => {
		window.location.replace(`${process.env.LANDING_URL}/registration`);
	}, []);

	return (
		<>
			{accessToken && profileDetail ? (
				<div className={styles.preferences}>
					<div>
						<IconButton
							aria-label="go to preferences"
							disabled
							form="square"
							icon={<Icon icon="gearSix" size={20} />}
							size="small"
							theme="tertiary"
						/>
					</div>
					<Text text={profileDetail.firstName} />
					<NavLink to="/login" className={styles.avatar}>
						<img className={styles.img} src={profileDetail.avatarUrl || Avatar} alt="avatar" />
					</NavLink>
				</div>
			) : (
				<div className={styles['auth-btns']}>
					<Button theme="link" onClick={handleLoginBtn}>
						Вход
					</Button>
					<Button onClick={handleRegisterBtn}>Регистрация</Button>
				</div>
			)}
		</>
	);
};
