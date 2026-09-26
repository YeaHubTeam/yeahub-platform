import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { removeBase64Data } from '@/shared/libs';

export const useCollectionImage = () => {
	const { setValue, watch } = useFormContext();
	const imageSrc = watch('imageSrc');
	const [previewImg, setPreviewImg] = useState<string | null>(imageSrc || null);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);
		setPreviewImg(imageBase64);
		setValue('collectionImage', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('imageSrc', null);
	};

	return { previewImg, changeImage, removeImage };
};
