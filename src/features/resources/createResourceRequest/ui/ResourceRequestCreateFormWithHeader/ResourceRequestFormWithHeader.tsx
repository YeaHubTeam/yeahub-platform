import PropTypes from 'prop-types'; // <--- НОВЫЙ ИМПОРТ!
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace, Resources } from '@/shared/config/i18n/i18nTranslations';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceForm } from '@/entities/resource';

import { CreateResourceRequestFormValues } from '../../model/types/resourceRequestCreateTypes';

import styles from './ResourceRequestFormWithHeader.module.css';

interface ResourceRequestFormWithHeaderProps {
	onSubmit: (formData: CreateResourceRequestFormValues) => Promise<void>;
}

export const ResourceRequestFormWithHeader: React.FC<ResourceRequestFormWithHeaderProps> = ({
	onSubmit,
}) => {
	const {
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useFormContext<CreateResourceRequestFormValues>();

	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.resources]);

	const handleClearForm = () => {
		reset();
	};
	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex gap="20" align="center" className={styles.buttons}>
				<Button className={styles['button-clear']} disabled={!isDirty} onClick={handleClearForm}>
					{t(Translation.DELETE)}
				</Button>
				<Button
					disabled={!isDirty}
					className={styles['submit-button']}
					onClick={handleSubmit(onSubmit)}
					type="submit"
				>
					{t(Resources.SUBMIT_FOR_MODERATION, { ns: i18Namespace.resources })}
				</Button>
			</Flex>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Text variant="body5-strong" color="black-900">
						{t(Marketplace.ADD_RESOURCE_TITLE)}
					</Text>
					<ResourceForm />
				</Flex>
			</Card>
		</Flex>
	);
};

ResourceRequestFormWithHeader.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
