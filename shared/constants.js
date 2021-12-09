import PropTypes from 'prop-types';

export const ARTICLE_SHAPE = PropTypes.shape({
	id                        : PropTypes.string.isRequired,
	tags                      : PropTypes.arrayOf(PropTypes.string).isRequired,
	headline                  : PropTypes.string.isRequired,
	slug                      : PropTypes.string.isRequired,
	publishedDate             : PropTypes.string.isRequired,
	author                    : PropTypes.shape({
		name  : PropTypes.string,
		photo : PropTypes.shape({
			url : PropTypes.string
		})
	}).isRequired,
	attributeOriginalAuthor   : PropTypes.bool.isRequired,
	originalAuthor            : PropTypes.string,
	content                   : PropTypes.string.isRequired,
	relatedArticlesCollection : PropTypes.shape({
		items : PropTypes.arrayOf(PropTypes.string)
	}).isRequired
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
