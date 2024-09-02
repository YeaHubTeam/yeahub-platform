import { differenceInYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, IconButton } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { Profile, USER_LINK } from '@/entities/profile';

import styles from './UserInfo.module.css';

interface UserInfoProps {
	profile: Profile;
}

export const UserInfo = ({ profile }: UserInfoProps) => {
	const navigate = useNavigate();

	const { firstName, lastName, birthday, phone, email, country, city } = profile.user;

	return (
		<div className={styles['card-right']}>
			<div className={styles['card-header']}>
				<h2 className={styles['card-name']}>{`${firstName} ${lastName}`}</h2>
				<div className={styles['card-status']}>{'Кандидат'}</div>
				<Button
					theme="link"
					tagName="button"
					className={styles['card-edit']}
					onClick={() => navigate('edit#personal-information')}
				>
					Редактировать
				</Button>
			</div>
			<ul className={styles['card-info']}>
				<li>{`${differenceInYears(new Date(), new Date(birthday))} лет`}</li>
				<li>{'UX/UI дизайнер в Яндекс'}</li>
				<li>{`Опыт: ${23} лет`}</li>
				<li>
					{country}, {city}
				</li>
			</ul>
			<div className={styles['card-contacts']}>
				<h4 className={styles['card-phone']}>{phone}</h4>
				<h4 className={styles['card-mail']}>{email}</h4>
				{USER_LINK && (
					<div className={styles['card-link']}>
						{USER_LINK.map((link) => (
							<IconButton
								key={link.code}
								type="submit"
								aria-label="primary large"
								form="round"
								icon={<Icon icon={link.title as IconsName} size={20} />}
								size="small"
								theme="primary"
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
