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

import { ResourceModerationModal } from '@/entities/resource';

import { useCreateResourceRequestMutation } from '../../api/createResourceRequestApi';
import { resourceRequestCreateSchema } from '../../model/lib/validation/resourceRequestCreateSchema';
import {
	CreateResourceBodyRequest,
	CreateResourceRequestFormValues,
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
			skills: [],
			specializations: [],
			keywords: [],
		},
	});

	const [createResourceRequestMutation] = useCreateResourceRequestMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);
	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
		navigate(route(ROUTES.wiki.resources.my.page));
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
			skills: formData.skills,
			specializations: formData.specializations,
		};
		try {
			await createResourceRequestMutation(requestBody).unwrap();
			methods.reset();
			handleOpenModal();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error(i18n.t(Translation.TOAST_RESOURCE_REQUEST_CREATE_FAILED));
		}
	};

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ResourceRequestFormWithHeader onSubmit={onCreateResourceRequest} />
			</LeavingPageBlocker>
			<ResourceModerationModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</FormProvider>
	);
};
