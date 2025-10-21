import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Marketplace, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useModal } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';
import { Text } from '@/shared/ui/Text';

import { ResourceForm, ResourceRequest, ResourceRequestStatusChip } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { ApproveRequestButton } from '@/features/resources/approveRequest';
import { ResourceEditFormHeader } from '@/features/resources/editResource/ui/ResourceEditFormHeader/ResourceEditFormHeader';
import { useEditResourceRequestMutation } from '@/features/resources/editResourceRequest/api/editResourceRequestApi';
import { resourceRequestEditSchema } from '@/features/resources/editResourceRequest/model/lib/validation/resourceRequestEditSchema';
import { EditResourceRequestFormValues } from '@/features/resources/editResourceRequest/model/types/resourceRequestEditTypes';
import { ResourceEditedModerationModal } from '@/features/resources/editResourceRequest/ui/ResourceEditedModerationModal/ResourceEditedModerationModal';
import { RejectResourceRequestButton } from '@/features/resources/rejectResourceRequest';

import styles from './ResourceEditFormRequest.module.css';

interface ResourceRequestEditFormProps {
	request: ResourceRequest;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceEditFormRequest = ({ request }: ResourceRequestEditFormProps) => {
	const navigate = useNavigate();
	const { resourceId } = useParams<{ resourceId: string }>();
	const { skills, specializations, requestPayload, ...formattedRequest } = request;

	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.translation]);

	const methods = useForm<EditResourceRequestFormValues>({
		resolver: yupResolver(resourceRequestEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedRequest,
			...requestPayload,
			iconBase64: requestPayload.imageSrc,
			skills: formatToFormField<Skill[]>(skills),
			specializations: formatToFormField<Specialization[]>(specializations),
		},
	});

	const [editResourceRequestMutation] = useEditResourceRequestMutation();

	const { isOpen, onToggle } = useModal();

	const onClose = () => {
		onToggle();
		navigate(ROUTES.admin.resources.page);
	};

	const onEditResourceRequest = async (data: EditResourceRequestFormValues) => {
		const { skills, specializations, status, ...restFormData } = data;
		try {
			await editResourceRequestMutation({
				product: { ...restFormData },
				skills: data.skills,
				specializations: data.specializations,
			}).unwrap();
			onToggle();
		} catch (_) {
			toast.error(i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED));
		}
	};

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<Flex componentType="main" gap="24" className={styles.wrapper}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<ResourceEditFormHeader
						onSubmit={onEditResourceRequest}
						className={styles.header}
						btnVariant="destructive-secondary"
					/>
					<Card className={styles.content}>
						<Flex direction="column" gap="28">
							<Flex justify="between">
								<Text variant="body5-strong" color="black-900">
									{t(Marketplace.EDIT_RESOURCE_TITLE)}
								</Text>
								<ResourceRequestStatusChip status="pending" />
							</Flex>
							<ResourceForm />
							<Flex gap="12" align="center" style={{ marginLeft: 'auto' }}>
								<RejectResourceRequestButton resourceId={resourceId ?? ''} />
								<ApproveRequestButton resourceId={resourceId || ''} />
							</Flex>
						</Flex>
					</Card>
					<ResourceEditedModerationModal isOpen={isOpen} onClose={onClose} />
				</LeavingPageBlocker>
			</Flex>
		</FormProvider>
	);
};
