import { AvatarWithoutPhoto } from '../AvatarWithoutPhoto';
import { FileLoader } from '../FileLoader';
import { Accept, Extension } from '../FileLoader/model/types/types';
import { Flex } from '../Flex';

import style from './ImageLoader.module.css';

export const ImageLoader = () => {
	return (
		<div className={style.container}>
			<Flex className={style['profile-picture-wrapper']} gap="16">
				<Flex gap="8" direction="column">
					<AvatarWithoutPhoto />
					<button type="button" className={style['delete-avatar-btn']}>
						Удалить фото
					</button>
				</Flex>
				<FileLoader
					maxFileMBSize={5}
					accept={Accept.IMAGE}
					fileTypeText={'фотографию'}
					extensionsText={Extension.IMAGE}
					onChange={(_: globalThis.File[]) => {}}
				/>
			</Flex>
		</div>
	);
};
