import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Icon, IconButton, Text } from 'yeahub-ui-kit';

import Avatar from '@/shared/assets/images/MockAvatar.png';
import { manageLocalStorage } from '@/shared/helpers/manageLocalStorage';

import { useProfileQuery } from '@/entities/auth';

import styles from './UserPreferences.module.css';

const { getStoredItem } = manageLocalStorage('accessToken');

export const UserPreferences = () => {
	const { data: profile } = useProfileQuery();
	const accessToken = getStoredItem();
	const navigate = useNavigate();

	const handleLoginBtn = () => {
		navigate('/auth/login');
	};
	const handleRegisterBtn = () => {
		navigate('/auth/registration');
	};

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
					<NavLink to="/auth/login" className={styles.avatar}>
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
