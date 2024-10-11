import { differenceInYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { formatAddress } from '@/shared/helpers/formatAddress';

import { GetProfileResponse } from '@/entities/auth';
import { SocialNetWorkList } from '@/entities/socialNetwork';
import { Specialization } from '@/entities/specialization';

import styles from './UserInfoBlock.module.css';

interface UserInfoProps {
	profile: GetProfileResponse;
	profileSpecialization: Specialization | undefined;
}

export const UserInfoBlock = ({ profile, profileSpecialization }: UserInfoProps) => {
	const navigate = useNavigate();

	const { firstName, lastName, birthday, phone, email, country, city } = profile;

	return (
		<div className={styles['card-info']}>
			<div className={styles['card-header']}>
				<h2 className={styles['card-name']}>{`${firstName} ${lastName}`}</h2>
				<Button
					theme="link"
					tagName="button"
					className={styles['card-edit']}
					onClick={() => navigate('edit#personal-information')}
				>
					Редактировать
				</Button>
			</div>
			<ul className={styles['card-list']}>
				{!!birthday && <li>{`${differenceInYears(new Date(), new Date(birthday))} лет`}</li>}
				{!!profileSpecialization?.title && <li>{profileSpecialization?.title}</li>}
				{formatAddress(country, city)}
			</ul>
			<div className={styles['card-contacts']}>
				<h4 className={styles['card-phone']}>{phone}</h4>
				<h4 className={styles['card-mail']}>{email}</h4>
				{profile.profiles[0].socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={profile.profiles[0].socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
