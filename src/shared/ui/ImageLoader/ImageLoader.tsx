import withoutPhoto from '@/shared/assets/images/Photo_Profile.png';

import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';

import style from './ImageLoader.module.css';

export const ImageLoader = () => {
	return (
		<div className={style.container}>
			<div className={style['profile-picture-wrapper']}>
				<div className={style['avatar-wrapper']}>
					<img src={withoutPhoto} alt="Avatar" />
				</div>
				<FileLoader
					maxFileMBSize={5}
					accept={Accept.IMAGE}
					fileTypeText={'фотографию'}
					extensionsText={Extension.IMAGE}
					onChange={(_: globalThis.File[]) => {}}
				/>
			</div>
			<button type="button" className={style['delete-avatar-btn']}>
				Удалить фото
			</button>
		</div>
	);
};
