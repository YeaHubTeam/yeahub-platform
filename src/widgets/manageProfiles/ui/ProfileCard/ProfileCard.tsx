import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Specializations } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { DeleteProfileButton } from '@/features/profile/deleteProfile';
import { useSetActiveProfileMutation } from '@/features/profile/setActiveProfile';

import { profile } from '../../model/assets';

import styles from './ProfileCard.module.css';

interface ProfileCardProps {
	profileId: string;
	specializationId: number;
	profileImageSrc?: string;
	isActive?: boolean;
	isEmptySpecialization?: boolean;
}

export const ProfileCard = ({
	profileId,
	specializationId,
	profileImageSrc,
	isActive = false,
	isEmptySpecialization = false,
}: ProfileCardProps) => {
	const { t } = useTranslation([i18Namespace.specialization, i18Namespace.profile]);

	const { isMobile } = useScreenSize();

	const navigate = useNavigate();

	const {
		data: specialization,
		isLoading,
		isError,
	} = useGetSpecializationByIdQuery(String(specializationId), { skip: isEmptySpecialization });

	const [setActiveProfile] = useSetActiveProfileMutation();

	const handleProfileSet = () => {
		if (!isActive) {
			setActiveProfile(profileId);
		}
	};

	const handleProfileNavigate = () => {
		navigate(ROUTES.interview.page);
	};

	const specializationText = isEmptySpecialization
		? t(Specializations.STUB_EMPTY_TITLE)
		: specialization?.title;

	const showDeleteButton = !isActive && !isLoading && !isError && !isMobile;

	const titleStyles = classnames(styles.title, {
		[styles['icon-check']]: isActive,
		[styles['active-color']]: isActive,
	});
	const border = { [styles['active-border']]: isActive };
	const cardStyles = classnames(styles.card, border);
	const imageStyles = classnames(styles.image, border);

	return (
		<Flex className={styles.container}>
			<Flex componentType="button" onClick={handleProfileSet} className={cardStyles}>
				<Flex align="center" gap="16">
					<img src={profileImageSrc ?? profile} alt="profile" className={imageStyles} />
					<Text variant="body3-accent" className={titleStyles}>
						{specializationText}
					</Text>
				</Flex>
			</Flex>
			{isActive && (
				<Button
					variant="link"
					onClick={handleProfileNavigate}
					className={classnames(styles.button, styles.open)}
					suffix={<Icon icon="arrowRight" className={styles.icon} />}
				>
					{t(Profile.MANAGE_PROFILES_OPEN, { ns: i18Namespace.profile })}
				</Button>
			)}
			{showDeleteButton && <DeleteProfileButton profileId={profileId} className={styles.button} />}
		</Flex>
	);
};
