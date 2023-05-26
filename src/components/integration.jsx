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
			<label key="toggle" class="toggle">
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
		<section id="initial">
			{ subcomponentArray.map(
				([name, ...props]) =>
					subcomponents[name](...props)
			) }
		</section>
	);
};

const Integration = ({
	searchIndexes,
	firstSubcomponentArray,
	secondSubcomponentArray
}) => {
	const [indexIndex, setIndexIndex] = useState(0);
	console.log(searchIndexes)
	return (
		<main id="componentContainer">
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
									<section id="searchbox">
										<SearchBox />
									</section>

									<section id="left-column">
										{ secondSubcomponentArray }
									</section>

									<section id="results">
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
