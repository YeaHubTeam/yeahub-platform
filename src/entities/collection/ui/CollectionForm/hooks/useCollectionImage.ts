import { useFormContext } from 'react-hook-form';

import { addBase64Data, removeBase64Data } from '@/shared/libs';

export const useCollectionImage = () => {
	const { setValue, watch } = useFormContext();
	const imageSrc = watch('imageSrc');
	const collectionImage = watch('collectionImage');
	const previewImg = addBase64Data(collectionImage) || imageSrc || null;

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);
		setValue('collectionImage', image);
	};

	const removeImage = () => {
		setValue('collectionImage', undefined);
		setValue('imageSrc', null);
	};

	return { previewImg, changeImage, removeImage };
};
