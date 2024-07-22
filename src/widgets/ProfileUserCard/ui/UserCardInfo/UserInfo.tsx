import { Button, Icon, IconButton } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { USER_INFO, USER_LINK } from '@/entities/profileUser';

import styles from './UserInfo.module.css';

export const UserInfo = () => {
	const { first_name, last_name, status, age, position, experience, location, phone, email } =
		USER_INFO;

	return (
		<div className={styles['card-right']}>
			<div className={styles['card-header']}>
				<h2 className={styles['card-name']}>{`${first_name} ${last_name}`}</h2>
				<div className={styles['card-status']}>{status}</div>
				<Button theme="link" tagName="button" className={styles['card-edit']}>
					Редактировать
				</Button>
			</div>
			<ul className={styles['card-info']}>
				<li>{`${age} лет`}</li>
				<li>{position}</li>
				<li>{`Опыт: ${experience} лет`}</li>
				<li>{location}</li>
			</ul>
			<div className={styles['card-contacts']}>
				<h4 className={styles['card-phone']}>{phone}</h4>
				<h4 className={styles['card-mail']}>{email}</h4>
				<div className={styles['card-link']}>
					{USER_LINK.map((link) => (
						<IconButton
							key={link.id}
							type="submit"
							aria-label="primary large"
							form="round"
							icon={<Icon icon={link.name as IconsName} size={20} />}
							size="small"
							theme="primary"
						/>
					))}
				</div>
			</div>
		</div>
	);
};
