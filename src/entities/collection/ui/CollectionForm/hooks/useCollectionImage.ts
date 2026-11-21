import { useFormContext } from 'react-hook-form';

import { removeBase64Data } from '@/shared/libs';

export const useCollectionImage = () => {
	const { setValue } = useFormContext();

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setValue('collectionImage', image, { shouldDirty: true });
		setValue('imageSrc', null, { shouldDirty: true });
	};

	const removeImage = () => {
		setValue('collectionImage', null, { shouldDirty: true });
		setValue('imageSrc', null, { shouldDirty: true });
	};

	return { changeImage, removeImage };
};
