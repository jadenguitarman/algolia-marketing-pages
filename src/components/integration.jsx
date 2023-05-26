import { useState } from 'react';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, RefinementList, SearchBox, Hits } from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/satellite.css';
import "../styles/integration.css";

const uniqueID = (inp, prefix="") => `${prefix}-${btoa(inp).slice(0, 30)}`;

const InitialSection = ({
	subcomponentArray,
	indexIndex,
	setIndexIndex
}) => {
	const subcomponents = {
		"heading": heading => ( <h1 key={uniqueID(heading, "heading")}>{ heading } </h1> ),
		"text": text => ( <h1 key={uniqueID(text, "text")}>{ text } </h1> ),
		"toggle": (label1, label2) => (
			<label key="toggle" className="integration-toggle">
				<input type="checkbox" onClick={() => {
					// toggle indexIndex
					setIndexIndex(indexIndex ? 0 : 1);
				}} />
				<span>{label1}</span>
				<div></div>
				<span>{label2}</span>
			</label>
		)
	};
	return (
		<section id="integration-initial">
			{ subcomponentArray.map(
				([name, ...props]) =>
					subcomponents[name](...props)
			) }
		</section>
	);
};

const LeftSection = ({ subcomponentArray }) => {
	const subcomponents = {
		"heading": heading => ( <h1 key={uniqueID(heading, "heading")}>{ heading } </h1> ),
		"text": text => ( <h1 key={uniqueID(text, "text")}>{ text } </h1> ),
		"refinementList": componentProps => (
			<RefinementList
				{...componentProps}
				key={uniqueID(JSON.stringify(componentProps), "refinementList")}
			/>
		)
	};
	return (
		<>
			{ subcomponentArray.map(
				([name, ...props]) =>
					subcomponents[name](...props)
			) }
		</>
	);
}

const Integration = ({
	searchIndexes,
	firstSubcomponentArray,
	secondSubcomponentArray
}) => {
	const [indexIndex, setIndexIndex] = useState(0);
	console.log(searchIndexes)
	return (
		<main id="integration-component-container">
			<InitialSection
				subcomponentArray={firstSubcomponentArray}
				indexIndex={indexIndex}
				setIndexIndex={setIndexIndex}
			/>

			{searchIndexes.map(({creds, client}, thisIndex) => (
				<InstantSearch
					searchClient={client}
					indexName={creds.indexName}
					key={btoa(JSON.stringify(creds)).slice(0, 30)}
				>
					{
						indexIndex == thisIndex
							? (
								<>
									<section id="integration-searchbox">
										<SearchBox />
									</section>

									<section id="integration-left-column">
										<LeftSection
											subcomponentArray={secondSubcomponentArray}
										/>
									</section>

									<section id="integration-results">
										<Hits hitComponent={({ hit }) => (
											<p>{ hit.title } by { hit.artist }</p>
										)} />
									</section>
								</>
							)
							: null
					}
				</InstantSearch>
			))}
		</main>
	);
};

export default Integration;
