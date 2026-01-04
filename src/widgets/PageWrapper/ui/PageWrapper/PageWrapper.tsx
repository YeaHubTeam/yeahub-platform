import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { EMAIL_VERIFY_SETTINGS_TAB, SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { Stub, StubType } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

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
	hasPermissions?: boolean;
	hasVerification?: boolean;
	hasSubscription?: boolean;
	hasData?: boolean;
	stubs: PageWrapperStubs;
	paginationOptions?: Pagination;
	content: ReactNode;
	children: ({ content, pagination }: ChildrenProps) => ReactNode;
}

export const PageWrapper = ({
	hasError,
	hasFilters,
	hasPermissions = true,
	hasVerification = true,
	hasSubscription = true,
	hasData,
	stubs,
	paginationOptions,
	content,
	children,
}: PageWrapperProps) => {
	const navigate = useNavigate();

	const onMoveMainPage = () => {
		navigate(ROUTES.interview.page);
	};

	const onMoveVerifyPage = () => {
		navigate(EMAIL_VERIFY_SETTINGS_TAB);
	};

	const onMoveSubscriptionPage = () => {
		navigate(SELECT_TARIFF_SETTINGS_TAB);
	};

	if (!hasPermissions) {
		return (
			<Stub type="access-denied" onClick={stubs['access-denied']?.onClick ?? onMoveMainPage} />
		);
	}

	if (!hasVerification) {
		return (
			<Stub
				type="access-denied-verify"
				onClick={stubs['access-denied-verify']?.onClick ?? onMoveVerifyPage}
			/>
		);
	}

	if (!hasSubscription) {
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
				<Stub type="error" onClick={stubs.error?.onClick} />
			) : (
				<>
					{!hasData && hasFilters && (
						<Stub type="filter-empty" onClick={stubs['filter-empty']?.onClick} />
					)}
					{!hasData && !hasFilters && (
						<Stub
							type="empty"
							subtitle={stubs.empty?.subtitle}
							title={stubs.empty?.title}
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
