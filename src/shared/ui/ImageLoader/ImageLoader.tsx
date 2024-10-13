import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';

import style from './ImageLoader.module.css';

export const ImageLoader = () => {
	const { t } = useI18nHelpers();
	const { t: tProfile } = useI18nHelpers('profile');

	return (
		<div className={style.container}>
			<div className={style['profile-picture-wrapper']}>
				<AvatarWithoutPhoto />
				<FileLoader
					maxFileMBSize={5}
					accept={Accept.IMAGE}
					fileTypeText={t('fileLoader.fileTypes.photo')}
					extensionsText={Extension.IMAGE}
					onChange={(_: globalThis.File[]) => {}}
				/>
			</div>
			<button type="button" className={style['delete-avatar-btn']}>
				{tProfile('photo.deletePhotoButton')}
			</button>
		</div>
	);
};
