import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, TextArea, Input, Label } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';

import { CollectionFormProps } from '../../model/types/collectionFormProps';

import styles from './CollectionForm.module.css';

export const CollectionForm = ({ isEdit, imageSrc }: CollectionFormProps) => {
	const { t } = useTranslation([i18Namespace.collections]);
	const { control, setValue, register, watch } = useFormContext();

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

	const watchPaid = watch('isPaid', false);
	const watchFree = watch('isFree', false);

	return (
		<>
			<Text
				title={isEdit ? t(Collections.EDIT_PAGE_TITLE) : t(Collections.CREATE_PAGE_TITLE)}
				className={styles['main-title']}
			/>
			<Flex direction="column" gap="60">
				<Flex className={`${styles['collection-input']}`} gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text title={t(Collections.TITLE_FULL)} className={styles.title} />
						<Text title={t(Collections.TITLE_LABEL)} className={styles.description} />
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
				<Flex direction="column" gap="8">
					<Text title={t(Collections.DESCRIPTION_FULL)} className={styles.title} />
					<Text title={t(Collections.DESCRIPTION_LABEL)} className={styles.description} />
					<FormControl name="description" control={control}>
						{(field, hasError) => (
							<TextArea
								id="description"
								className={styles.textarea}
								placeholder={t(Collections.DESCRIPTION_PLACEHOLDER)}
								state={hasError ? 'error' : 'default'}
								{...field}
							/>
						)}
					</FormControl>
				</Flex>
				<Flex gap="120">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Collections.ICON_TITLE)} className={styles.title} />
						<Text title={t(Collections.ICON_LABEL)} className={styles.description} />
					</Flex>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</Flex>
				<Flex gap="120" align="center">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Collections.SELECT_CHOOSE)} className={styles.title} />
						<Text title={t(Collections.SELECT_LABEL)} className={styles.description} />
					</Flex>
					<Flex gap="60">
						<Label className={styles['paid-label']}>
							<Checkbox
								{...register('isPaid')}
								checked={watchPaid}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue('isPaid', e.target.checked)
								}
							/>
							{t(Collections.SELECT_PAID)}
						</Label>

						<Label className={styles['paid-label']}>
							<Checkbox
								{...register('isFree')}
								checked={watchFree}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue('isFree', e.target.checked)
								}
							/>
							{t(Collections.SELECT_FREE)}
						</Label>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
