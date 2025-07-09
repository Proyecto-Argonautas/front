import { Link } from "react-router";

export function Welcome() {
	return (
		<main className="flex flex-col items-center justify-center pt-16 pb-4">
			<p>Hello World</p>
			<Link to="/test">
				<button
					type="button"
					className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
					Test
				</button>
			</Link>
		</main>
	);
}