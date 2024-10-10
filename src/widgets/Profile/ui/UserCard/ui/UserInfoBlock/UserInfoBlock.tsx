import { differenceInYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile as ProfileI18 } from '@/shared/config/i18n/i18nTranslations';
import { formatAddress } from '@/shared/helpers/formatAddress';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Profile } from '@/entities/profile';
import { SocialNetWorkList } from '@/entities/socialNetwork';
import { Specialization } from '@/entities/specialization';

import styles from './UserInfoBlock.module.css';

interface UserInfoProps {
	profile: Profile;
	profileSpecialization: Specialization | undefined;
}

export const UserInfoBlock = ({ profile, profileSpecialization }: UserInfoProps) => {
	const navigate = useNavigate();
	const { t } = useI18nHelpers(i18Namespace.profile);

	const { firstName, lastName, birthday, phone, email, country, city } = profile.user;

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
					{t(ProfileI18.PROFILEPAGE_EDITBUTTON)}
				</Button>
			</div>
			<ul className={styles['card-list']}>
				{!!birthday && (
					<li>{`${differenceInYears(new Date(), new Date(birthday))} ${t(ProfileI18.PROFILEPAGE_YEARS)}`}</li>
				)}
				{!!profileSpecialization?.title && <li>{profileSpecialization?.title}</li>}
				{formatAddress(country, city)}
			</ul>
			<div className={styles['card-contacts']}>
				<h4 className={styles['card-phone']}>{phone}</h4>
				<h4 className={styles['card-mail']}>{email}</h4>
				{profile.socialNetwork?.length > 0 ? (
					<SocialNetWorkList socialNetwork={profile.socialNetwork} />
				) : null}
			</div>
		</div>
	);
};
