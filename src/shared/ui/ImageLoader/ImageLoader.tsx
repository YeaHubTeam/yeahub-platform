/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { RefObject, useRef } from 'react';

import Gallery from '@/shared/assets/images/Gallery.png';
import withoutPhoto from '@/shared/assets/images/Photo_Profile.png';

import style from './ImageLoader.module.css';

export const ImageLoader = () => {
	const uploaderRef: RefObject<HTMLInputElement> = useRef(null);
	const handleUploader = () => {
		if (uploaderRef.current) {
			uploaderRef.current.click();
		}
	};
	return (
		<div className={style.container}>
			<div className={style['profile-picture-wrapper']}>
				<div className={style['avatar-wrapper']}>
					<img src={withoutPhoto} alt="Avatar" />
				</div>
				<div onClick={handleUploader} className={style['image-upload-container']}>
					<div className={style['svg-wrapper']}>
						<img src={Gallery} alt="" />
					</div>

					<p>
						<span>Кликни для изменения</span> или перетащи сюда фотографию
					</p>
					<p className={style['size-descriptions']}>JPG,PNG,JPEG (не более 5мб)</p>
					<input ref={uploaderRef} type="file" accept="image/*" hidden />
				</div>
			</div>
			<button type="button" className={style.btn}>
				Удалить фото
			</button>
		</div>
	);
};
