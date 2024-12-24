import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Text, TextArea } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';

import styles from './SkillForm.module.css';

interface SkillFormProps {
	imageSrc?: string | null;
	isEdit?: boolean;
}

export const SkillForm = ({ isEdit, imageSrc }: SkillFormProps) => {
	const { t } = useTranslation(i18Namespace.skill);

	const { control, setValue } = useFormContext();

	const [previewImg, setPreviewImg] = useState<string | null>(imageSrc || null);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('skillImage', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('imageSrc', null);
	};

	return (
		<>
			<Text
				title={isEdit ? t(Skills.EDIT_PAGE_TITLE) : t(Skills.CREATE_PAGE_TITLE)}
				className={styles['main-title']}
			/>
			<Flex direction="column" gap="60">
				<Flex className={`${styles['skills-input']}`} gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text title={t(Skills.TITLE_FULL)} className={styles.title} />
						<Text title={t(Skills.TITLE_LABEL)} className={styles.description} />
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
				<Flex gap="120">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Skills.ICON_TITLE)} className={styles.title} />
						<Text title={t(Skills.ICON_LABEL)} className={styles.description} />
					</Flex>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</Flex>

				<Flex direction="column" gap="8">
					<Text title={t(Skills.DESCRIPTION_FULL)} className={styles.title} />
					<Text title={t(Skills.DESCRIPTION_LABEL)} className={styles.description} />
					<FormControl name="description" control={control}>
						{(field, hasError) => (
							<TextArea
								id="description"
								className={styles.textarea}
								placeholder={t(Skills.DESCRIPTION_PLACEHOLDER)}
								state={hasError ? 'error' : 'default'}
								{...field}
							/>
						)}
					</FormControl>
				</Flex>
			</Flex>
		</>
	);
};
