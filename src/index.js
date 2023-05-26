import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Integration from './components/integration.jsx';
import Steps from './components/steps.jsx';
import algoliasearch from 'algoliasearch/lite';

const searchCredentials = [
	{
		appID: "0QUDFPAZO6",
		apiKey: "de4c257ee9b6e9f41581c13d10ef0bad",
		indexName: "songs"
	},
	{
		appID: "8WCMJCP5DG",
		apiKey: "7654ba9896fe4286deca1195f47bb2a0",
		indexName: "lyrics"
	}
];

const ShowSteps = () => (
	<Steps stepArray={[
		{
			heading: "This is a heading.",
			content: "This is paragraph content.",
			imageURL: "https://picsum.photos/200"
		},
		{
			heading: "This is a second heading.",
			content: "This is more paragraph content.",
			imageURL: "https://picsum.photos/200"
		},
		{
			heading: "This is a third heading.",
			content: "This is even more paragraph content.",
			//imageURL: "https://picsum.photos/200"
		}
	]} />
);

const ShowIntegration = () => (
	<Integration
		searchIndexes={searchCredentials.map(creds => ({
			creds,
			client: algoliasearch(
				creds.appID,
				creds.apiKey
			)
		}))}
		firstSubcomponentArray={[
			["heading", "Hello yall"],
			["toggle", "Use events", "Ignore events"]
		]}
		secondSubcomponentArray={[
			["refinementList", {
				attribute: "artist"
			}]
		]}
	/>
);

const App = () => (
	<div className="App">
		{ /* <ShowSteps /> */ }
		<ShowIntegration />
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
