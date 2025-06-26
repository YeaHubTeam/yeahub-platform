import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Specializations } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text, TextSkeleton } from '@/shared/ui/Text';

import { useGetSpecializationByIdQuery } from '@/entities/specialization';

import { useSetActiveProfileMutation } from '../../api/manageProfileApi';
import { DeleteProfileButton } from '../DeleteProfileButton/DeleteProfileButton';

import { profile } from './../../model/assets';
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
	const { t } = useTranslation(i18Namespace.specialization);

	const titleStyles = classnames(styles.title, {
		[styles['icon-check']]: isActive,
		[styles['active-color']]: isActive,
	});
	const border = { [styles['active-border']]: isActive };
	const cardStyles = classnames(styles.card, border);
	const imageStyles = classnames(styles.image, border);

	const {
		data: specialization,
		isLoading,
		isError,
	} = useGetSpecializationByIdQuery(String(specializationId), { skip: isEmptySpecialization });

	const [setActiveProfile] = useSetActiveProfileMutation();

	const { isMobile } = useScreenSize();

	const handleProfileSet = () => {
		if (!isActive) {
			setActiveProfile({ id: profileId });
		}
	};

	const renderSpecialization = () => {
		if (isLoading || isError) {
			return <TextSkeleton variant="body3-accent" width="180px" />;
		} else if (isEmptySpecialization) {
			return t(Specializations.STUB_EMPTY_TITLE);
		} else {
			return specialization?.title;
		}
	};

	const showDeleteButton = !isActive && !isLoading && !isError && !isMobile;

	return (
		<Flex className={styles.container}>
			<Flex componentType="button" onClick={handleProfileSet} className={cardStyles}>
				<Flex align="center" gap="16">
					<img src={profileImageSrc ?? profile} alt="profile" className={imageStyles} />
					<Text variant="body3-accent" className={titleStyles}>
						{renderSpecialization()}
					</Text>
				</Flex>
			</Flex>
			{showDeleteButton && <DeleteProfileButton profileId={profileId} className={styles.delete} />}
		</Flex>
	);
};
