import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import {
	EMAIL_VERIFY_SETTINGS_TAB,
	SELECT_TARIFF_SETTINGS_TAB,
	useAppSelector,
} from '@/shared/libs';
import { Loader } from '@/shared/ui/Loader';
import { Stub, StubType } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

import { getFullProfile, getHasPremiumAccess, getIsVerified } from '@/entities/profile';
import { RoleName } from '@/entities/user';

type StubProps = {
	title?: string;
	subtitle?: string;
	onClick?: () => void;
	buttonText?: string;
};

type Pagination = {
	page: number;
	limit: number;
	total: number;
	onChangePage: (page: number) => void;
};

export type PageWrapperStubs = Partial<Record<StubType, StubProps>>;

type ChildrenProps = {
	content: ReactNode;
	pagination?: ReactNode;
};

interface PageWrapperProps {
	hasError?: boolean;
	hasFilters?: boolean;
	shouldVerify?: boolean;
	shouldPremium?: boolean;
	hasData?: boolean;
	isLoading?: boolean;
	stubs: PageWrapperStubs;
	roles?: RoleName[];
	paginationOptions?: Pagination;
	content: ReactNode;
	skeleton?: ReactNode;
	children: ({ content, pagination }: ChildrenProps) => ReactNode;
}

export const PageWrapper = ({
	hasError,
	hasFilters,
	shouldVerify = false,
	shouldPremium = false,
	hasData,
	isLoading,
	stubs,
	roles,
	paginationOptions,
	content,
	skeleton,
	children,
}: PageWrapperProps) => {
	const navigate = useNavigate();

	const isVerified = useAppSelector(getIsVerified);
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);
	const profile = useAppSelector(getFullProfile);

	const hasPermission = roles
		? roles?.some((role) => profile?.userRoles?.some(({ name }) => role === name))
		: true;

	const onMoveMainPage = () => {
		navigate(ROUTES.interview.page);
	};

	const onMoveVerifyPage = () => {
		navigate(EMAIL_VERIFY_SETTINGS_TAB);
	};

	const onMoveSubscriptionPage = () => {
		navigate(SELECT_TARIFF_SETTINGS_TAB);
	};

	if (isLoading) {
		return skeleton || <Loader />;
	}

	if (roles && !hasPermission) {
		return (
			<Stub type="access-denied" onClick={stubs['access-denied']?.onClick ?? onMoveMainPage} />
		);
	}

	if (shouldVerify && !isVerified) {
		return (
			<Stub
				type="access-denied-verify"
				onClick={stubs['access-denied-verify']?.onClick ?? onMoveVerifyPage}
			/>
		);
	}

	if (shouldPremium && !hasPremiumAccess) {
		return (
			<Stub
				type="access-denied-subscription"
				onClick={stubs['access-denied-subscription']?.onClick ?? onMoveSubscriptionPage}
			/>
		);
	}

	const stub = (
		<>
			{hasError ? (
				<Stub
					type="error"
					title={stubs.error?.title}
					subtitle={stubs.error?.subtitle}
					buttonText={stubs.error?.buttonText}
					onClick={stubs.error?.onClick}
				/>
			) : (
				<>
					{!hasData && hasFilters && (
						<Stub
							type="filter-empty"
							title={stubs['filter-empty']?.title}
							subtitle={stubs['filter-empty']?.subtitle}
							buttonText={stubs['filter-empty']?.buttonText}
							onClick={stubs['filter-empty']?.onClick}
						/>
					)}

					{!hasData && !hasFilters && (
						<Stub
							type="empty"
							title={stubs.empty?.title}
							subtitle={stubs.empty?.subtitle}
							buttonText={stubs.empty?.buttonText}
							onClick={stubs.empty?.onClick}
						/>
					)}

					{hasData && <>{content}</>}
				</>
			)}
		</>
	);

	const pagination = (
		<>
			{paginationOptions && (
				<TablePagination
					page={paginationOptions.page}
					onChangePage={paginationOptions.onChangePage}
					limit={paginationOptions.limit}
					total={paginationOptions.total}
				/>
			)}
		</>
	);

	return <>{children({ content: stub, pagination })}</>;
};
