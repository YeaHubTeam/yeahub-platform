import { BackHeaderSkeleton } from '../BackHeader';
import { ButtonSkeleton } from '../Button';
import { DeleteButtonSkeleton } from '../DeleteButton';

export const HeaderAdminPageDetailCardSkeleton = () => {
	return (
		<BackHeaderSkeleton>
			<DeleteButtonSkeleton isDetailPage />
			<ButtonSkeleton width={180} />
		</BackHeaderSkeleton>
	);
};
