import preact from 'preact';
import PropTypes from 'prop-types';

import getCN from 'classnames';

import {CardMenu} from 'liferay-help-center-megamenu';

const TabContent = ({content}) => (
	<section aria-labelledby={content.ariaLabelledby} class="col-md-9" role="tabpanel">
		<CardMenu
			className="products-landing-tab-content"
			configs={content.configs}
			type="product"
		/>
	</section>
);

TabContent.PropTypes = {
	content: PropTypes.objectOf(
		PropTypes.shape(
			{
				ariaLabelledby: PropTypes.string,
				configs: PropTypes.object
			}
		)
	)
};

class TabList extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.setContent = this.setContent.bind(this);

		this.state = {
			activeId: 'tab-0',
			content: this.setContent('tab-0')
		};
	}

	handleClick(event) {
		this.setState(
			{
				activeId: event.target.id,
				content: this.setContent(event.target.id)
			}
		);
	}

	setContent(id) {
		return this.props.contentArray.find(
			content => content.ariaLabelledby === id
		);
	}

	render({tabList}, {activeId, content}) {
		return (
			<div class="row">
				<div class="col-md-3 products-landing-tablist">
					<ul class="nav nav-stacked" role="tablist">
						{tabList.map(
							tab => {
								const className = getCN(
									{
										'active': tab.id === activeId
									},
									'btn',
									'btn-unstyled',
									'nav-link'
								);

								return (
									<li class="nav-item" key={tab.id} role="presentation">
										<button class={className} id={tab.id} onClick={this.handleClick} role="tab" type="button">
											{tab.name}
										</button>
									</li>
								);
							}
						)}
					</ul>
				</div>

				<TabContent
					content={content}
				/>
			</div>
		);
	}
}

TabList.PropTypes = {
	contentArray: PropTypes.array.isRequired,
	tabList: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.shape(
				{
					id: PropTypes.string,
					name: PropTypes.string
				}
			)
		)
	).isRequired
};

const ProductTabs = ({kbPermission, productItems}) => {
	(!kbPermission) {
		
	}

	const contentArray = productItems.map(
		(item, index) => (
			{
				ariaLabelledby: `tab-${index}`,
				configs: item.configs
			}
		)
	);

	const tabList = productItems.map(
		(item, index) => (
			{
				id: `tab-${index}`,
				name: item.name
			}
		)
	);

	return <TabList
		contentArray={contentArray}
		tabList={tabList}
	/>;
};

ProductTabs.PropTypes = {
	kbPermission: PropTypes.bool.isRequired,
	productItems: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.shape(
				{
					configs: PropTypes.object,
					name: PropTypes.string
				}
			)
		)
	).isRequired
};

export default ProductTabs;