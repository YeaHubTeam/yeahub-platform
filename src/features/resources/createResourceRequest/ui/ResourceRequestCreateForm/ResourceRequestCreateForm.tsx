import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { ResourceModerationModal } from '@/features/resources/resourceModerationModal';

import { useCreateResourceRequestMutation } from '../../api/createResourceRequestApi';
import { resourceRequestCreateSchema } from '../../model/lib/validation/resourceRequestCreateSchema';
import {
	CreateResourceBodyRequest,
	CreateResourceRequestFormValues,
	CreateResourceRequestResponse,
} from '../../model/types/resourceRequestCreateTypes';
import { ResourceRequestFormWithHeader } from '../ResourceRequestCreateFormWithHeader/ResourceRequestFormWithHeader';

export const ResourceRequestCreateForm = () => {
	const navigate = useNavigate();

	const methods = useForm<CreateResourceRequestFormValues>({
		resolver: yupResolver(resourceRequestCreateSchema),
		mode: 'onTouched',
		defaultValues: {
			name: '',
			url: '',
			description: '',
			iconBase64: '',
			resourceSkills: [],
			resourceSpecializations: [],
			keywords: [],
		},
	});

	const [createResourceRequestMutation] = useCreateResourceRequestMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [resourceForModal, setResourceForModal] = useState<CreateResourceRequestResponse | null>(
		null,
	);

	const handleOpenModal = useCallback((resource: CreateResourceRequestResponse) => {
		setIsModalOpen(true);
		setResourceForModal(resource);
	}, []);
	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
		setResourceForModal(null);
		navigate(route(ROUTES.wiki.resources.requests.page));
	}, [navigate]);

	const onCreateResourceRequest = async (formData: CreateResourceRequestFormValues) => {
		const requestBody: CreateResourceBodyRequest = {
			product: {
				name: formData.name,
				description: formData.description,
				type: formData.type,
				iconBase64: formData.iconBase64,
				url: formData.url,
				keywords: formData.keywords || [],
			},
			skills: formData.resourceSkills,
			specializations: formData.resourceSpecializations,
		};
		try {
			const result = await createResourceRequestMutation({
				resource: requestBody,
				isUser: true,
			}).unwrap();
			methods.reset();
			handleOpenModal(result);
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error);
			toast.error(i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_FAILED));
		}
	};

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ResourceRequestFormWithHeader onSubmit={onCreateResourceRequest} />
			</LeavingPageBlocker>
			<ResourceModerationModal
				isOpen={isModalOpen}
				resourceData={resourceForModal}
				onClose={handleCloseModal}
			/>
		</FormProvider>
	);
};
