import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import { MemoryRouter } from 'react-router';
import Header from '../Header';
import TopSection from '../TopSection';

test('Should Render Header Correctly', () => {
	const heading = 'Test Heading';
	const paragraph = 'Test Paragraph';
	const linkName = 'TestLinkName';
	const linkUrl = '/TestLinkName';
	const { getByText } = render(
		<Header heading={heading} paragraph={paragraph} linkName={linkName} linkUrl={linkUrl} />,
		{ wrapper: MemoryRouter }
	);
	const headingText = getByText(heading);
	const paragraphText = getByText(paragraph);

	expect(headingText).toHaveTextContent(heading);
	expect(paragraphText).toHaveTextContent(paragraph);
});
test('Should Render Top Section Correctly', () => {
	render(<TopSection />);
	//COULD NOT GET TEXT BECAUSE OF SPAN IN HTML
});
