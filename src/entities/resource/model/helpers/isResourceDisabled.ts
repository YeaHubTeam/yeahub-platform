export const isResourceDisabled = ({
	isAuthor,
	createdById,
	userId,
}: {
	isAuthor: boolean;
	createdById?: string | null;
	userId: string;
}) => {
	return isAuthor && Boolean(createdById) && createdById !== userId;
};
