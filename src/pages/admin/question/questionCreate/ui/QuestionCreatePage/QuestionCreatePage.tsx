import { QuestionCreateForm } from '@/features/question/createQuestion';

import { PageWrapper } from '@/widgets/PageWrapper';

const QuestionCreatePage = () => {
	const content = <QuestionCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin', 'author']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default QuestionCreatePage;
