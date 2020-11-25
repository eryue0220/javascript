function attr(ele, name, value) {
    if (!name || name.constructor !== 'string') return '';

    name = { 'for': 'htmlFor', 'className': 'class' }[name] || name;

    if (value) {
        ele[name] = value;

        if (ele.setAttribute) {
            ele.setAttribute(name, value);
        }
    }

    return ele[name] || ele.getAttribute(name) || ''
}