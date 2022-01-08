import PropTypes from 'prop-types';

export const ARTICLE_SHAPE = PropTypes.shape({
	id                        : PropTypes.string.isRequired,
	headline                  : PropTypes.string.isRequired,
	slug                      : PropTypes.string.isRequired,
	publishedDate             : PropTypes.string.isRequired,
	author                    : PropTypes.shape({
		name  : PropTypes.string,
		photo : PropTypes.shape({
			url : PropTypes.string
		})
	}),
	attributeOriginalAuthor   : PropTypes.bool,
	originalAuthor            : PropTypes.string,
	featuredImage             : PropTypes.shape({
		url : PropTypes.string
	}),
	aspectRatio               : PropTypes.bool,
	content                   : PropTypes.string,
	relatedArticlesCollection : PropTypes.shape({
		items : PropTypes.arrayOf(PropTypes.string)
	})
});

export const ARTICLE_FEED_SHAPE = PropTypes.arrayOf(ARTICLE_SHAPE);

export const RESOURCE_SHAPE = PropTypes.shape({
	id               : PropTypes.string.isRequired,
	title            : PropTypes.string.isRequired,
	slug             : PropTypes.string.isRequired,
	description      : PropTypes.string,
	shortDescription : PropTypes.string,
	screenshot       : PropTypes.shape({
		url : PropTypes.string
	}),
	downloadable     : PropTypes.shape({
		url : PropTypes.string
	}),
	subject          : PropTypes.arrayOf(PropTypes.string).isRequired,
	category         : PropTypes.arrayOf(PropTypes.string).isRequired,
	publishedDate    : PropTypes.string.isRequired
});

export const RESOURCES_SHAPE = PropTypes.arrayOf(RESOURCE_SHAPE);

export const TEAM_MEMBER_SHAPE = PropTypes.shape({
	id       : PropTypes.number.isRequired,
	name     : PropTypes.string.isRequired,
	pronouns : PropTypes.arrayOf(PropTypes.string),
	position : PropTypes.string,
	photo    : PropTypes.shape({
		url : PropTypes.string
	}).isRequired,
	bio      : PropTypes.string.isRequired
});

export const TEAM_MEMBERS_SHAPE = PropTypes.arrayOf(TEAM_MEMBER_SHAPE);

export const QUOTE_SHAPE = PropTypes.shape({
	id     : PropTypes.number.isRequired,
	byline : PropTypes.string.isRequired,
	text   : PropTypes.string.isRequired
});

export const QUOTES_SHAPE = PropTypes.arrayOf(QUOTE_SHAPE);
