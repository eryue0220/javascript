/**
 * @date 2017-06-07
 * @file ajax.js
 * @desc jquery ajax 实现
 * @author Cinchen
 */

function invariant(condition, message) {
	if (!condition) {
		throw new Error(message)
	}
}

function handleRequestData(data) {
	const typeOfData = typeof data
	const toString = Object.prototype.toString
	let result = ''

	if (typeOfData === 'string') {
		return data
	} else {
		if (toString.call(data) === '[object Object]') {
			for (const key in data) {
				result += `${key}=${data[key]}&`
			}
		} else if (Array.isArray(data)) {
			result = data.join(',')
		}
	}

	if (result.indexOf('&') > -1) result = result.slice(0, result.lastIndexOf('&'))

	return result
}

function createHashFunctionName() {
	const time = new Date().valueOf()
	const randomNumber = String(Math.random()).slice(2)

	return `jQuery${randomNumber}_${time}`
}

function createXHR() {
	let xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	} else {
		throw new Error('Your browser does not support AJAX.')
	}

	return xhr;
}

function ajaxRequest({
 	method,
	url,
	callback
}) {
	const xhr = createXHR()

	if (xhr) {
		xhr.onreadystatechange = function() {
			if (xhr.status === 200 || xhr.readyState === 4) {
				typeof callback === 'function' && callback(xhr.responseText)
			}
		}

		xhr.open(method, url, true)
		xhr.send(null)
	}
}

function jsonpRequest({
	url,
	data,
	callback
}) {
	let funcName = createHashFunctionName()
	const src = handleRequestData(data)
	url += `?callback=${funcName}&${src}`

	window[funcName] = data => {
		typeof callback === 'function' && callback(data)
	}

	const script = document.createElement('script')
	script.src = url
	script.id = funcName

	script.onload = function() {
		document.body.removeChild(document.getElementById(funcName))
		window[funcName] = funcName = null
	}

	document.body.appendChild(script);
}

function ajax(options) {
	invariant(options, 'The first argument is undefined.')
	invariant(
		Object.prototype.toString.call(options) === '[object Object]',
		'The argument type should be object.'
	)

	const method = options.type || 'get'
	const data = options.data
	const callback = options.callback
	const jsonp = options.jsonp
	let url = options.url

	invariant(url, 'The object should contains url arguments')
	invariant(typeof url === 'string', 'The url type should be string.')

	if (jsonp) {
		jsonpRequest({
			url,
			data,
			callback
		})
	} else {
		ajaxRequest({
			method,
			url: `${url}?${handleRequestData(data)}`,
			callback
		})
	}
}