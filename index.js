'use strict';

/*!
 * ss2react
 * https://github.com/SnakeskinTpl/ss2react
 *
 * Released under the MIT license
 * https://github.com/SnakeskinTpl/ss2react/blob/master/LICENSE
 */

const
	snakeskin = require('snakeskin'),
	babel = require('babel-core');

function setParams(p) {
	p = Object.assign({}, p, {
		doctype: 'transitional',
		literalBounds: ['{', '}'],
		attrLiteralBounds: ['{', '}']
	});

	p.adapterOptions = Object.assign({babelrc: false}, p.adapterOptions, {
		plugins: [
			require('babel-plugin-syntax-jsx'),
			require('babel-plugin-transform-react-jsx'),
			require('babel-plugin-transform-react-display-name')
		].concat(p.plugins || [])
	});

	return p;
}

function template(id, fn, txt, p) {
	txt = `${id} = ${fn + (/\breturn\s+\(?\s*[{<](?!\/)/.test(txt) ? '' : 'return ') + txt}};`;
	p = Object.assign({}, p);
	delete p.header;
	delete p.footer;
	return babel.transform(txt, p).code;
}

exports.adapter = function (txt, opt_params, opt_info) {
	return snakeskin.adapter(txt, {
		template,
		setParams,
		importNative: 'import React from "react";',
		importCJS: 'typeof React === "undefined" ? require("react") : React',
		importAMD: '"react"',
		importGlobal: 'React',
		local: 'React'
	}, opt_params, opt_info);
};
