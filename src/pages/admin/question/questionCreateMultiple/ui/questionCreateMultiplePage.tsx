import { PageWrapper } from '@/widgets/PageWrapper';

const questionCreateMultiplePage = () => {
	const content = <div>QuestionCreateMultiplePage</div>;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default questionCreateMultiplePage;
