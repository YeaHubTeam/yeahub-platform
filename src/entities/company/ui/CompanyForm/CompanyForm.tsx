import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Text } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Companies } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';

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
		setValue('imageSrc', null);
	};

	return (
		<>
			<Text
				title={isEdit ? t(Companies.EDIT_PAGE_TITLE) : t(Companies.CREATE_PAGE_TITLE)}
				className={styles['main-title']}
			/>
			<Flex direction="column" gap="60" className={`${styles['form-container']}`}>
				<Flex className={`${styles['companies-input']}`} gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text title={t(Companies.TITLE_FULL)} className={styles.title} />
						<Text title={t(Companies.TITLE_LABEL)} className={styles.description} />
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
				<Flex gap="120">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Companies.ICON_TITLE)} className={styles.title} />
						<Text title={t(Companies.ICON_LABEL)} className={styles.description} />
					</Flex>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</Flex>
			</Flex>
		</>
	);
};
