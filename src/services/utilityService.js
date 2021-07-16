function nl2br(value, is_xhtml) {
	var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';

	console.log(value);

	return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function stripTags(value) {
	return value.replace(/(<([^>]+)>)/gi, '');
}

export const utilityService = {
	nl2br,
	stripTags,
};
