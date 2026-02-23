import { useSearchParams } from 'react-router-dom';

export const useMyRequestsFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const isMy = searchParams.get('isMy') === 'true';

	const toggleMyRequests = (checked: boolean) => {
		const newParams = new URLSearchParams(searchParams);
		if (checked) {
			newParams.set('isMy', 'true');
		} else {
			newParams.delete('isMy');
		}
		setSearchParams(newParams, { replace: true });
	};

	return {
		isMy,
		toggleMyRequests,
	};
};
