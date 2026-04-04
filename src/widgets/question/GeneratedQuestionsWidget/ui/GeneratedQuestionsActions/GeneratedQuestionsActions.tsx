import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { MoveToExistCollectionModal } from '../MoveToExistCollectionModal/MoveToExistCollectionModal';

export const GeneratedQuestionsActions = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useModal();

	const onMoveToNewCollection = () =>
		navigate(`${ROUTES.admin.collections.create.page}?withGeneratedQuestions=true`);

	return (
		<Flex gap="20">
			<Button variant="primary" size="large" onClick={onMoveToNewCollection}>
				{t(Questions.GENERATED_QUESTIONS_ADD_TO_COLLECTION_NEW)}
			</Button>
			<Button variant="primary" size="large" onClick={onOpen}>
				{t(Questions.GENERATED_QUESTIONS_ADD_TO_COLLECTION_OLD)}
			</Button>
			<MoveToExistCollectionModal isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
};
