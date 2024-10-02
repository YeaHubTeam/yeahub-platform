import { differenceInYears } from 'date-fns';

import { formatAddress } from '@/shared/helpers/formatAddress';

import { Profile } from '@/entities/profile';
import { SocialNetWorkList } from '@/entities/socialNetwork';
import { Specialization } from '@/entities/specialization';

import styles from './UserInfoBlock.module.css';

interface UserInfoProps {
	profile: Profile;
	profileSpecialization: Specialization | undefined;
}

export const UserInfoBlock = ({ profile, profileSpecialization }: UserInfoProps) => {
	const { firstName, lastName, birthday, phone, email, country, city } = profile.user;

	return (
		<div className={styles['card-info']}>
			<div className={styles['card-header']}>
				<h2 className={styles['card-name']}>{`${firstName} ${lastName}`}</h2>
			</div>
			<ul className={styles['card-list']}>
				{!!birthday && <li>{`${differenceInYears(new Date(), new Date(birthday))} лет`}</li>}
				{!!profileSpecialization?.title && <li>{profileSpecialization?.title}</li>}
				{formatAddress(country, city)}
			</ul>
			<div className={styles['card-contacts']}>
				<h4>{phone}</h4>
				<h4>{email}</h4>
				{profile.socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={profile.socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
