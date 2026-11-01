import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Companies } from '@/shared/config';
import { removeBase64Data } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { FormInputText } from '@/shared/ui/Form';
import { FormField } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { Text } from '@/shared/ui/Text';

import styles from './CompanyForm.module.css';

interface CompanyFormProps {
	imageSrc?: string | null;
	isEdit?: boolean;
}

export const CompanyForm = ({ isEdit, imageSrc }: CompanyFormProps) => {
	const { t } = useTranslation([i18Namespace.companies]);

	const { control, setValue } = useFormContext();

	const [previewImg, setPreviewImg] = useState<string | null>(imageSrc || null);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('companyImage', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('companyImage', null);
		setValue('imageSrc', null);
	};

	return (
		<>
			<Text variant="body6" className={styles['main-title']}>
				{isEdit ? t(Companies.EDIT_PAGE_TITLE) : t(Companies.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60" className={`${styles['form-container']}`}>
				<FormInputText
					label={t(Companies.TITLE_FULL)}
					description={t(Companies.TITLE_LABEL)}
					name="title"
					control={control}
					formControlClassName={`${styles['input-form']}`}
				/>
				<FormField label={t(Companies.ICON_TITLE)} description={t(Companies.ICON_LABEL)}>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</FormField>
			</Flex>
		</>
	);
};
