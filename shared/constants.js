import PropTypes from 'prop-types';

export const ARTICLE_SHAPE = PropTypes.shape({
	id                        : PropTypes.string.isRequired,
	tags                      : PropTypes.arrayOf(PropTypes.object).isRequired,
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
	content                   : PropTypes.string,
	relatedArticlesCollection : PropTypes.shape({
		items : PropTypes.arrayOf(PropTypes.string)
	})
});

export const ARTICLE_FEED_SHAPE = PropTypes.arrayOf(ARTICLE_SHAPE);

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
