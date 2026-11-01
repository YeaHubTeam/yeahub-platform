import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Companies } from '@/shared/config';
import { removeBase64Data } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { Input } from '@/shared/ui/Input';
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

	const companyImagePreview = useWatch({
		control,
		name: 'companyImagePreview',
		defaultValue: '',
	});

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setValue('companyImage', image, { shouldDirty: true });

		if (isEdit) {
			setPreviewImg(imageBase64);
		} else {
			setValue('companyImagePreview', imageBase64, { shouldDirty: true });
		}
	};

	const removeImage = () => {
		if (isEdit) {
			setPreviewImg(null);
			setValue('companyImage', null, { shouldDirty: true });
			setValue('imageSrc', null, { shouldDirty: true });
		} else {
			setValue('companyImage', '', { shouldDirty: true });
			setValue('companyImagePreview', '', { shouldDirty: true });
		}
	};
	return (
		<>
			<Text variant="body6" className={styles['main-title']}>
				{isEdit ? t(Companies.EDIT_PAGE_TITLE) : t(Companies.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60" className={`${styles['form-container']}`}>
				<FormField label={t(Companies.TITLE_FULL)} description={t(Companies.TITLE_LABEL)}>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} />}
					</FormControl>
				</FormField>
				<FormField label={t(Companies.ICON_TITLE)} description={t(Companies.ICON_LABEL)}>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={isEdit ? previewImg : companyImagePreview || null}
					/>
				</FormField>
			</Flex>
		</>
	);
};
