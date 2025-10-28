import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useModal } from '@/shared/hooks';
import { useCurrentProject } from '@/shared/hooks';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { ResourceRequest } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { useEditResourceRequestMutation } from '../../api/editResourceRequestApi';
import { resourceRequestEditSchema } from '../../model/lib/validation/resourceRequestEditSchema';
import { EditResourceRequestFormValues } from '../../model/types/resourceRequestEditTypes';
import { ResourceEditedModerationModal } from '../ResourceEditedModerationModal/ResourceEditedModerationModal';
import { ResourceRequestFormWithHeader } from '../ResourceRequestEditFormWithHeader/ResourceRequestFormWithHeader';

interface ResourceEditFormAllProps {
	request: ResourceRequest;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceRequestEditForm = ({ request }: ResourceEditFormAllProps) => {
	const navigate = useNavigate();
	const { skills, specializations, requestPayload, ...formattedRequest } = request;
	const project = useCurrentProject();

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
		project === 'admin'
			? navigate(ROUTES.admin.resources.page)
			: navigate(ROUTES.wiki.resources.my.page);
	};

	const onEditResourceRequest = async (formData: EditResourceRequestFormValues) => {
		const { skills, specializations, status, ...restFormData } = formData;
		try {
			await editResourceRequestMutation({
				product: { ...restFormData },
				skills: formData.skills,
				specializations: formData.specializations,
			}).unwrap();
			onToggle();
			project === 'admin' && toast.success(i18n.t(Translation.TOAST_RESOURCE_EDIT_SUCCESS));
		} catch (_) {
			toast.error(i18n.t(Translation.TOAST_RESOURCE_EDIT_FAILED));
		}
	};

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<ResourceRequestFormWithHeader onSubmit={onEditResourceRequest} />
			</LeavingPageBlocker>
			{project === 'platform' && (
				<ResourceEditedModerationModal isOpen={isOpen} onClose={onClose} />
			)}
		</FormProvider>
	);
};
