import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { Flex } from '@/shared/ui/Flex';

import { ResourceRequest, MyResourceCard } from '@/entities/resource';

interface ResourcesListProps {
	resources?: ResourceRequest[];
}

export const MyResourcesList = ({ resources }: ResourcesListProps) => {
	return (
		<Flex direction="column" gap="20">
			{(resources || []).map((resource) => (
				<Link key={resource.id} to={(route(ROUTES.wiki.resources.my.request.page), resource.id)}>
					<MyResourceCard resource={resource} />
				</Link>
			))}
		</Flex>
	);
};
