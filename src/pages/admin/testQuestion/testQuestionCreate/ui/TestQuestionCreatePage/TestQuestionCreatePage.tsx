import { PageWrapper } from '@/widgets/PageWrapper';

const TestQuestionCreatePage = () => {
	return (
		<PageWrapper hasData roles={['admin', 'author']} stubs={{}} content={<div />}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TestQuestionCreatePage;
