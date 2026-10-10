import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Resources } from '@/shared/config';
import { useCurrentProject } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormHeader } from '@/shared/ui/FormHeader';
import { Text } from '@/shared/ui/Text';

import { ResourceForm, ResourceRequestStatusChip } from '@/entities/resource';

import type { EditResourceRequestFormValues } from '../../model/types/resourceRequestEditTypes';

import styles from './ResourceRequestFormWithHeader.module.css';

interface ResourceRequestFormWithHeaderProps {
	onSubmit: (formData: EditResourceRequestFormValues) => Promise<void>;
	isLoading?: boolean;
}

export const ResourceRequestFormWithHeader = ({
	onSubmit,
	isLoading,
}: ResourceRequestFormWithHeaderProps) => {
	const {
		watch,
		handleSubmit,
		formState: { isDirty, isSubmitting },
	} = useFormContext<EditResourceRequestFormValues>();

	const status = watch('status');
	const project = useCurrentProject();

	const { t } = useTranslation([i18Namespace.resources, i18Namespace.marketplace]);

	return (
		<Flex componentType="main" className={styles.wrapper}>
			{project === 'admin' ? (
				<FormHeader<EditResourceRequestFormValues>
					onSubmit={onSubmit}
					isLoading={isLoading}
					className={styles.header}
				/>
			) : (
				<Flex align="center" className={styles.buttons}>
					<Button
						size="large"
						disabled={!isDirty || isSubmitting}
						className={styles['submit-button']}
						onClick={handleSubmit(onSubmit)}
					>
						{t(Marketplace.ADD_RESOURCE_SUBMIT, { ns: 'marketplace' })}
					</Button>
				</Flex>
			)}

			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Flex justify="between">
						<Text variant="body5-strong" color="black-900">
							{t(Resources.REQUESTS_TITLE_EDIT)}
						</Text>
						<ResourceRequestStatusChip status={status} />
					</Flex>
					<ResourceForm />
				</Flex>
			</Card>
		</Flex>
	);
};
