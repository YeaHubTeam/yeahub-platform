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
import { Text } from '@/shared/ui/Text';

import { FullProfile } from '@/entities/auth';
import { getActiveProfile, getIsEdit } from '@/entities/profile';
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
	const activeProfile = useAppSelector(getActiveProfile);

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
					<Text variant="body6">{username}</Text>
					<UserRolesList userRoles={userRoles} />
				</Flex>
				{!!birthday && (
					<Text variant="body3-accent">{`${differenceInYears(new Date(), new Date(birthday))} лет`}</Text>
				)}
			</div>
			{!!profileSpecialization?.title && (
				<Text variant="body3-accent" color="black-800">
					{profileSpecialization?.title}
				</Text>
			)}
			<ul className={styles['card-list']}>
				<li className={styles['card-address']}>{formatAddress(country, city)}</li>
			</ul>
			<div className={styles['card-contacts']}>
				{isEdit &&
					(isEmailVerified ? (
						<Flex align="center" gap="4">
							<DoubleCheck className={styles['svg-check']} />
							<Text variant="body2" color="black-700">
								{email}
							</Text>
						</Flex>
					) : (
						<Link to={EMAIL_VERIFY_SETTINGS_TAB}>
							<Flex align="center" gap="4">
								<Time className={styles['svg-time']} />
								<Text variant="body2" color="black-600">
									{t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK)}
								</Text>
							</Flex>
						</Link>
					))}

				{activeProfile && activeProfile?.socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={activeProfile.socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
