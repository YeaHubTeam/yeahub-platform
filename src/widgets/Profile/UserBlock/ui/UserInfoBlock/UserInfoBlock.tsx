import { differenceInYears } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import DoubleCheck from '@/shared/assets/icons/doubleCheck.svg';
import Time from '@/shared/assets/icons/time.svg';
import { i18Namespace, Profile } from '@/shared/config';
import { useAppSelector, EMAIL_VERIFY_SETTINGS_TAB, useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { FullProfile } from '@/entities/auth';
import { getIsEdit } from '@/entities/profile';
import { SocialNetWorkList } from '@/entities/socialNetwork';
import { Specialization } from '@/entities/specialization';
import { UserRolesList } from '@/entities/user';

import styles from './UserInfoBlock.module.css';

const formatAddress = (country: string, city: string) => {
	if (country && city) return `${country}, ${city}`;
	if (country) return country;
	if (city) return city;

	return null;
};

interface UserInfoProps {
	profile: FullProfile;
	profileSpecialization: Specialization | undefined;
}

export const UserInfoBlock = ({ profile, profileSpecialization }: UserInfoProps) => {
	const { username, birthday, email, country, city, isVerified, userRoles } = profile;
	const { t } = useTranslation(i18Namespace.profile);

	const { isMobileS } = useScreenSize();
	const isEdit = useAppSelector(getIsEdit);

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
					(isVerified ? (
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

				{profile.activeProfile?.socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={profile.activeProfile.socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
