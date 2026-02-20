import AccessDeniedImg from '@/shared/assets/images/accessDenied.png';
import EmptyImg from '@/shared/assets/images/empty.png';
import LoadError from '@/shared/assets/images/loadError.png';
import SearchImg from '@/shared/assets/images/searchPage.png';
import type { StubType } from '@/shared/ui/Stub/types';

export const stubTestIds = {
	container: 'container',
	title: 'title',
	subtitle: 'subtitle',
	button: 'button',
};

export const titleByType: Record<StubType, string> = {
	empty: 'stub.empty.title',
	'filter-empty': 'stub.filter.title',
	error: 'stub.error.title',
	'access-denied': 'stub.accessDenied.default.title',
	'access-denied-verify': 'stub.accessDenied.verify.title',
	'access-denied-subscription': 'stub.accessDenied.subscription.title',
};

export const subtitleByType: Record<StubType, string> = {
	empty: 'stub.empty.subtitle',
	'filter-empty': 'stub.filter.subtitle',
	error: 'stub.error.subtitle',
	'access-denied': 'stub.accessDenied.default.description',
	'access-denied-verify': 'stub.accessDenied.verify.description',
	'access-denied-subscription': 'stub.accessDenied.subscription.description',
};

export const buttonTextByType: Record<StubType, string> = {
	empty: '',
	'filter-empty': 'stub.filter.submit',
	error: 'stub.error.submit',
	'access-denied': 'stub.accessDenied.default.button',
	'access-denied-verify': 'stub.accessDenied.verify.button',
	'access-denied-subscription': 'stub.accessDenied.subscription.button',
};

export const imgByType: Record<StubType, string> = {
	empty: EmptyImg,
	'filter-empty': SearchImg,
	error: LoadError,
	'access-denied': AccessDeniedImg,
	'access-denied-verify': AccessDeniedImg,
	'access-denied-subscription': AccessDeniedImg,
};
