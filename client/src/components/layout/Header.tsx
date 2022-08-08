import { Link, Path } from 'react-router-dom';
import Rosemary from '../../images/rosemary.png';

type Props = {
	heading: string;
	paragraph: string;
	linkName: string;
	linkUrl: string;
};

function Header({ heading, paragraph, linkName, linkUrl }: Props) {
	return (
		// <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		//     <div className="max-w-md w-full space-y-8">
		<div className="mb-10">
			<div className="flex justify-center">
				<img alt="" className="h-14 w-14" src={Rosemary} />
			</div>
			<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{heading}</h2>
			<p className="mt-2 text-center text-sm text-gray-600 mt-5">
				{paragraph}{' '}
				<Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
					{linkName}
				</Link>
			</p>
		</div>
		//     </div>
		// </div>
	);
}

export default Header;
