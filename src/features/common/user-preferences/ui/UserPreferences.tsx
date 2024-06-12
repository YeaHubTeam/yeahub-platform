import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Icon, IconButton, Text } from 'yeahub-ui-kit';

import Avatar from '@/shared/assets/images/MockAvatar.png';

import { getAccessToken, getProfile } from '../model/selectors/userPreferencesSelectors';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const navigate = useNavigate();

	const profile = useSelector(getProfile);
	const accessToken = useSelector(getAccessToken);

	const handleLoginBtn = useCallback(() => navigate('/login'), [navigate]);
	const handleRegisterBtn = useCallback(() => {
		window.location.replace(`${process.env.LANDING_URL}/registration`);
	}, []);

	const isAuth = !!accessToken && !!profile;

	return (
		<>
			{isAuth ? (
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
					<Text text={profile.firstName} />
					<NavLink to="/login" className={styles.avatar}>
						<img className={styles.img} src={profile.avatarUrl || Avatar} alt="avatar" />
					</NavLink>
				</div>
			) : (
				<div className={styles['auth-btns']}>
					<Button theme="link" onClick={handleLoginBtn} textClassName={styles['auth-btn']}>
						Вход
					</Button>
					<Button onClick={handleRegisterBtn}>Регистрация</Button>
				</div>
			)}
		</>
	);
};
