/*!
 * ss2react
 * https://github.com/SnakeskinTpl/ss2react
 *
 * Released under the MIT license
 * https://github.com/SnakeskinTpl/ss2react/blob/master/LICENSE
 */

require('core-js/es6/object');

var
	snakeskin = require('snakeskin'),
	babel = require('babel-core');

function setParams(p) {
	return Object.assign({}, p, {
		doctype: 'transitional',
		literalBounds: ['{', '}'],
		attrLiteralBounds: ['{', '}']
	});
}

function adaptor(id, fn, text, p) {
	text = id + ' = ' + fn + (/\breturn\s+\(?\s*[{<](?!\/)/.test(text) ? '' : 'return ') + text + '};';

	var opts = Object.assign({babelrc: false}, p, {
		plugins: [
			require('babel-plugin-syntax-jsx'),
			require('babel-plugin-transform-react-jsx'),
			require('babel-plugin-transform-react-display-name')
		].concat(p.plugins || [])
	});

	return babel.transform(text, opts).code;
}

exports.adaptor = function (txt, opt_params, opt_info) {
	return snakeskin.adaptor(txt, setParams, adaptor, opt_params, opt_info);
};
