import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/satellite.css';
import "../styles/steps.css";

const Steps = ({ stepArray }) => (
	<section id="steps-component-container">
		{stepArray.map((step, i) => (
			<div key={`step-${i}`} class="step-container">
				<div class={!!step.imageURL ? "step has-image" : "step"}>
					<span class="step-heading">{step.heading}</span>
					<span class="step-content">{step.content}</span>
					{
						!!step.imageURL
							? (
								<div class="step-image-container">
									<img src={step.imageURL} alt={step.imageAlt} />
								</div>
							)
							: null
					}
				</div>

				<div class="step-arrow-container">
					<svg viewBox="0 0 39.688 46.302">
						<path d="M187.304 103.036c-6.258-4.045-17.518-4.875-22.63-2.122 10.332-2.21 16.629.608 22.238 4.118 5.61 3.51 8.768 9.408 9.977 15.234 1.21 5.826-.034 14.072-1.056 17.258-1.784-.936-5.899-3.196-5.899-3.196l5.785 11.28 8.642-9.524s-4.103 1.513-6.028 1.958c.846-2.79 2.926-10.664 1.196-18.138-1.73-7.473-5.967-12.823-12.225-16.868z" transform="translate(-164.673 -99.306)"/>
					</svg>
				</div>
			</div>
		))}
	</section>
);

export default Steps;
