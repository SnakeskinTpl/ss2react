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
	p = Object.assign({}, p, {
		doctype: 'transitional',
		literalBounds: ['{', '}'],
		attrLiteralBounds: ['{', '}']
	});

	p.adaptorOptions = Object.assign({babelrc: false}, p.adaptorOptions, {
		plugins: [
			require('babel-plugin-syntax-jsx'),
			require('babel-plugin-transform-react-jsx'),
			require('babel-plugin-transform-react-display-name')
		].concat(p.plugins || [])
	});

	return p;
}

function template(id, fn, txt, p) {
	txt = id + ' = ' + fn + (/\breturn\s+\(?\s*[{<](?!\/)/.test(txt) ? '' : 'return ') + txt + '};';
	return babel.transform(txt, p).code;
}

exports.adaptor = function (txt, opt_params, opt_info) {
	return snakeskin.adaptor(txt, {
		template: template,
		setParams: setParams,
		importNative: 'import React from "react";',
		importCJS: 'typeof React === "undefined" ? require("react") : React',
		importAMD: '"react"',
		importGlobal: 'React',
		local: 'React'
	}, opt_params, opt_info);
};
