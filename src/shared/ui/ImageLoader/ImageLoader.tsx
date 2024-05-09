/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { RefObject, useRef } from 'react';

import Gallery from '@/shared/assets/images/Gallery.png';
import withoutPhoto from '@/shared/assets/images/Photo_Profile.png';

import cls from './ImageLoader.module.css';

export const ImageLoader = () => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);
	const handleUploader = () => {
		if (uploaderRef.current) {
			uploaderRef.current.click();
		}
	};
	return (
		<div className={cls.container}>
			<div className={cls['profile-picture-wrapper']}>
				<div className={cls['avatar-wrapper']}>
					<img src={withoutPhoto} alt="Avatar" />
				</div>
				<div onClick={handleUploader} className={cls['image-upload-container']}>
					<div className={cls['svg-wrapper']}>
						<img src={Gallery} alt="" />
					</div>

					<p>
						<span>Кликни для изменения</span> или перетащи сюда фотографию
					</p>
					<p className={cls['size-descriptions']}>JPG,PNG,JPEG (не более 5мб)</p>
					<input ref={uploaderRef} type="file" accept="image/*" hidden />
				</div>
			</div>
			<button type="button" className={cls.btn}>
				Удалить фото
			</button>
		</div>
	);
};
