import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Button } from '@/shared/ui/Button';
import { ImageLoader } from '@/shared/ui/ImageLoader';
import { Loader } from '@/shared/ui/Loader';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import { useProfileQuery } from '@/entities/auth';

import { useUpdateAvatarMutation } from '@/features/profile/editProfileForm';

import styles from './UserImageBlock.module.css';

interface UserImageBlockProps {
	avatar?: string;
}

export const UserImageBlock = ({ avatar }: UserImageBlockProps) => {
	const { t } = useTranslation(i18Namespace.profile);
	const { data: profile } = useProfileQuery();
	const [updateAvatar, { isLoading: isAvatarLoading }] = useUpdateAvatarMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const popoverRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(popoverRef, () => setIsModalOpen(false));

	const onImageChange = (image: string | null) => {
		if (profile) {
			updateAvatar({ id: profile.id, image, oldImage: profile.avatarUrl });
		}
		setIsModalOpen(false);
	};

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <Icon icon="imagesSquare" size={20} />,
			title: t(Profile.PHOTO_UPDATE_FULL),
			onClick: () => setIsModalOpen(true),
		},
		{
			renderComponent: () => (
				<Button
					onClick={() => {
						onImageChange(null);
					}}
					className={styles.button}
					variant="tertiary"
					preffix={<Icon icon="trashSimple" size={20} color="--palette-ui-red-700" />}
				>
					<Text color="red-700" variant="body3">
						{t(Profile.PHOTO_DELETE_FULL)}
					</Text>
				</Button>
			),
		},
	];

	return (
		<div className={styles['card-image']}>
			<Popover key={avatar} menuItems={settingsMenuItems}>
				{({ onToggle }) => (
					<div className={styles['card-avatar']}>
						{isAvatarLoading ? (
							<Loader hasText={false} className={styles.loader} />
						) : avatar ? (
							<button className={styles['image-button']} onClick={onToggle}>
								<img src={avatar} alt={t(Profile.PHOTO_TITLE)} className={styles['avatar-img']} />
							</button>
						) : (
							<AvatarWithoutPhoto />
						)}
					</div>
				)}
			</Popover>
			{isModalOpen && (
				<div ref={popoverRef}>
					<ImageLoader
						cropper={{
							aspectRatio: 1,
							title: t(Profile.PHOTO_MODAL_TITLE),
							description: t(Profile.PHOTO_MODAL_DESCRIPTION),
						}}
						minResolution={{ width: 128, height: 128 }}
						maxResolution={{ width: 2048, height: 2048 }}
						maxMBSize={5}
						setValue={onImageChange}
						initialSrc={profile?.avatarUrl || null}
						isLoading={isAvatarLoading}
						isPopover
					/>
				</div>
			)}
		</div>
	);
};
