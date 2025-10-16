export const isResourceDisabled = ({
	isAuthor,
	createdById,
	userId,
}: {
	isAuthor: boolean;
	createdById: string;
	userId: string;
}) => {
	return isAuthor && createdById !== userId;
};
