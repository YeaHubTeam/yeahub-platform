import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Collections, i18Namespace, ROUTES } from '@/shared/config';

import { useGetCollectionByIdQuery } from '@/entities/collection';

import { CollectionEditForm } from '@/features/collections/editCollection';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const CollectionEditPage = () => {
	const { t } = useTranslation(i18Namespace.collection);
	const { collectionId } = useParams<{ collectionId: string }>();
	const {
		data: collection,
		isLoading,
		isError,
		refetch,
	} = useGetCollectionByIdQuery({ collectionId: collectionId! });

	if (!collection) {
		return null;
	}

	const content = collection ? (
		<EditAccessGuard
			authorId={collection.createdBy?.id}
			redirectTo={ROUTES.admin.collections.page}
			titleStub={t(Collections.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Collections.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Collections.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<CollectionEditForm collection={collection} />
		</EditAccessGuard>
	) : null;

	const stubs: PageWrapperStubs = {
		error: { onClick: refetch },
	};

	return (
		<PageWrapper
			roles={['admin', 'author']}
			isLoading={isLoading}
			hasError={isError}
			hasData={!!collection && Object.keys(collection).length > 0}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CollectionEditPage;
