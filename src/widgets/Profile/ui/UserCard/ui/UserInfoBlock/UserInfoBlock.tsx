import { differenceInYears } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import DoubleCheck from '@/shared/assets/icons/DoubleCheck.svg';
import Time from '@/shared/assets/icons/Time.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { formatAddress } from '@/shared/helpers/formatAddress';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { FullProfile } from '@/entities/auth';
import { getIsEdit } from '@/entities/profile';
import { SocialNetWorkList } from '@/entities/socialNetwork';
import { Specialization } from '@/entities/specialization';
import { UserRolesList } from '@/entities/user';

import styles from './UserInfoBlock.module.css';

interface UserInfoProps {
	profile: FullProfile;
	profileSpecialization: Specialization | undefined;
}

export const UserInfoBlock = ({ profile, profileSpecialization }: UserInfoProps) => {
	const { username, birthday, email, country, city, isEmailVerified, userRoles } = profile;
	const { t } = useTranslation(i18Namespace.profile);
	const { isMobileS } = useScreenSize();
	const isEdit = useAppSelector(getIsEdit);

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
				<Flex
					gap={isMobileS ? '8' : '16'}
					direction={isMobileS ? 'column-reverse' : 'row'}
					justify="between"
					maxWidth
				>
					<h2 className={styles['card-name']}>{`${username}`}</h2>
					<UserRolesList userRoles={userRoles} />
				</Flex>
				{!!birthday && (
					<p className={styles['card-age']}>
						{`${differenceInYears(new Date(), new Date(birthday))} лет`}
					</p>
				)}
			</div>
			{!!profileSpecialization?.title && (
				<p className={styles['card-specialization']}>{profileSpecialization?.title}</p>
			)}
			<ul className={styles['card-list']}>
				<li className={styles['card-address']}>{formatAddress(country, city)}</li>
			</ul>
			<div className={styles['card-contacts']}>
				{isEdit &&
					(isEmailVerified ? (
						<Flex align="center" gap="4">
							<DoubleCheck className={styles['svg-check']} />
							<span className={styles['card-verify-span']}>{email}</span>
						</Flex>
					) : (
						<Link to={EMAIL_VERIFY_SETTINGS_TAB}>
							<Flex align="center" gap="4">
								<Time className={styles['svg-time']} />
								<span className={styles['card-verify-link']}>
									{t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK)}
								</span>
							</Flex>
						</Link>
					))}

				{profile.profiles[0].socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={profile.profiles[0].socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
