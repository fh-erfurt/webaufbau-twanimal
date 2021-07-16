/**
 * Umwandeln von Line-Breaks aus Textareas in HTML-Line-Breaks
 */
function nl2br(value, is_xhtml) {
	var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';

	return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

/**
 * Entfernen von allen Markup-Tags (<br>,<script>,...)
 */
function stripTags(value) {
	return value.replace(/(<([^>]+)>)/gi, '');
}

export const utilityService = {
	nl2br,
	stripTags,
};
