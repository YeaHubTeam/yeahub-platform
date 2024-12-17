import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Input, Text, TextArea } from 'yeahub-ui-kit';

import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { removeBase64Data } from '@/shared/helpers/removeBase64Data';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';

import { useGetSkillByIdQuery } from '../../api/skillApi';

import styles from './SkillForm.module.css';

export const SkillForm = () => {
	const { t } = useTranslation('skill');

	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext();
	// eslint-disable-next-line no-console
	console.log(errors);

	const params = useParams();
	const { data: skill, isLoading: isSkillLoading } = useGetSkillByIdQuery(params.skillId || '');

	const [previewImg, setPreviewImg] = useState<string | null>(skill?.imageSrc || null);

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
			<Text title={t(Skills.SKILLS_TITLE)} className={styles['main-title']} />
			<Flex direction="column" gap="60">
				<Flex className={`${styles['skills-input']}`} gap="120">
					<Flex className={styles['text-wrapper']} direction="column" gap="8">
						<Text title={t(Skills.TITLE_SKILL)} className={styles.title} />
						<Text title={t(Skills.CREATE_PAGE_TITLE)} className={styles.description} />
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
				<Flex gap="120">
					<Flex direction={'column'} className={styles['text-wrapper']} gap="8">
						<Text title={t(Skills.SKILL_ICON)} className={styles.title} />
						<Text title={t(Skills.ADD_SKILL_ICON)} className={styles.description} />
					</Flex>
					<ImageLoaderWithoutCropper
						isFileLoading={isSkillLoading}
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={previewImg}
					/>
				</Flex>

				<Flex direction="column" gap="8">
					<Text title={t(Skills.DESCRIPTION_SPECIALIZATION)} className={styles.title} />
					<Text title={t(Skills.DETAILED_DESCRIPTION_SKILL)} className={styles.description} />
					<FormControl name="description" control={control}>
						{(field, hasError) => (
							<TextArea
								id="description"
								className={styles.textarea}
								placeholder={t(Skills.DETAILED_DESCRIPTION_TEXTAREA)}
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
