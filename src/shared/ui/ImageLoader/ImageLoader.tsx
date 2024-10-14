import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';
import { Flex } from '../Flex';

import style from './ImageLoader.module.css';

interface ImageLoaderProps {
	imgSrc: string | null;
}

export const ImageLoader = ({ imgSrc }: ImageLoaderProps) => {
	const { t } = useI18nHelpers();
	const { t: tProfile } = useI18nHelpers('profile');

	return (
		<div className={style.container}>
			<Flex className={style['profile-picture-wrapper']} gap="16">
				<Flex className={style['profile-picture-block']} gap="8" direction="column">
					{imgSrc ? (
						<img className={style.img} src={imgSrc} alt="avatar" />
					) : (
						<AvatarWithoutPhoto />
					)}
					<button type="button" className={style['delete-avatar-btn']}>
						{tProfile('photo.deletePhotoButton')}
					</button>
				</Flex>
				<FileLoader
					maxFileMBSize={5}
					accept={Accept.IMAGE}
					fileTypeText={t('fileLoader.fileTypes.photo')}
					extensionsText={Extension.IMAGE}
					onChange={(_: globalThis.File[]) => {}}
				/>
			</Flex>
		</div>
	);
};
