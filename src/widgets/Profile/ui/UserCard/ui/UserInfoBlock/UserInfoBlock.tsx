import { differenceInYears } from 'date-fns';
import { Link } from 'react-router-dom';

import DoubleCheck from '@/shared/assets/icons/DoubleCheck.svg';
import Time from '@/shared/assets/icons/Time.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { formatAddress } from '@/shared/helpers/formatAddress';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { GetProfileResponse } from '@/entities/auth';
import { SocialNetWorkList } from '@/entities/socialNetwork';
import { Specialization } from '@/entities/specialization';

import styles from './UserInfoBlock.module.css';

interface UserInfoProps {
	profile: GetProfileResponse;
	profileSpecialization: Specialization | undefined;
}

export const UserInfoBlock = ({ profile, profileSpecialization }: UserInfoProps) => {
	const { firstName, lastName, birthday, phone, email, country, city, isEmailVerified } = profile;
	const { t } = useI18nHelpers(i18Namespace.profile);

	// return (
	// 	<div className={styles['card-info']}>
	// 		<div className={styles['card-header']}>
	// 			<h2 className={styles['card-name']}>{`${firstName} ${lastName}`}</h2>
	// 		</div>
	// 		<ul className={styles['card-list']}>
	// 			{!!birthday && <li>{`${differenceInYears(new Date(), new Date(birthday))} лет`}</li>}
	// 			{!!profileSpecialization?.title && <li>{profileSpecialization?.title}</li>}
	// 			{formatAddress(country, city)}
	// 		</ul>
	// 		<div className={styles['card-contacts']}>
	// 			<h4>{phone}</h4>
	// 			<h4>{email}</h4>
	// 			{profile.socialNetwork?.length > 0 ? (
	// 				<SocialNetWorkList socialNetwork={profile.socialNetwork} />
	// 			) : null}
	// 		</div>
	// 	</div>
	// );

	return (
		<div className={styles['card-info']}>
			<div className={styles['card-header']}>
				<h2 className={styles['card-name']}>{`${firstName} ${lastName}`}</h2>
				{!!birthday && (
					<p
						className={styles['card-age']}
					>{`${differenceInYears(new Date(), new Date(birthday))} лет`}</p>
				)}
			</div>
			{!!profileSpecialization?.title && (
				<p className={styles['card-specialization']}>{profileSpecialization?.title}</p>
			)}
			<ul className={styles['card-list']}>
				<li className={styles['card-address']}>{formatAddress(country, city)}</li>
			</ul>
			<div className={styles['card-contacts']}>
				<h4>
					{phone}
					{', '}{' '}
				</h4>

				{isEmailVerified ? (
					<div className={styles['card-verify']}>
						<DoubleCheck width={16} height={16} fill="#008616" /> {email}
					</div>
				) : (
					<Link to={ROUTES.settings.page}>
						<div className={styles['card-verify']}>
							<Time width={16} height={16} fill="#5E5E5E" />
							<p>{t(Profile.PROFILE_EMAIL_VERIFICATION_VERIFY_LINK)}</p>
						</div>
					</Link>
				)}

				{profile.profiles[0].socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={profile.profiles[0].socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
