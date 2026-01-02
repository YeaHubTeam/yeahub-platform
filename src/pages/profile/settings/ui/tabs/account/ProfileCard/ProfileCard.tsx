import classnames from 'classnames';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Profile, Specializations, ROUTES } from '@/shared/config';
import { useTruncation } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { useSetActiveProfileMutation } from '../../../../api/setActiveProfileApi';
import { profile } from '../../../../model/assets';
import { DeleteProfileButton } from '../DeleteProfileButton/DeleteProfileButton';

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
	const titleRef = useRef(null);
	const isTruncated = useTruncation(titleRef, 'row');

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

	const showDeleteButton = !isActive && !isLoading && !isError;

	const titleStyles = classnames(styles.title, {
		[styles['active-color']]: isActive,
	});
	const border = { [styles['active-border']]: isActive };
	const cardStyles = classnames(styles.card, border);
	const imageWrapperStyles = classnames(styles['image-wrapper'], {
		[styles['icon-check']]: isActive,
	});
	const imageStyles = classnames(styles.image, { border, [styles['icon-check']]: isActive });

	return (
		<Flex className={styles.container}>
			<Flex
				componentType="button"
				onClick={handleProfileSet}
				className={cardStyles}
				align="center"
				justify="between"
			>
				<Flex className={styles.info} align="center" gap="16">
					<Flex className={imageWrapperStyles}>
						<img src={profileImageSrc ?? profile} alt="profile" className={imageStyles} />
					</Flex>
					<Tooltip
						shouldShowTooltip={isTruncated}
						title={specializationText}
						placement="bottom"
						color="violet"
					>
						<Text isLimitSize ref={titleRef} variant="body3-accent" className={titleStyles}>
							{specializationText}
						</Text>
					</Tooltip>
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
				{showDeleteButton && (
					<DeleteProfileButton profileId={profileId} className={styles.button} />
				)}
			</Flex>
		</Flex>
	);
};
