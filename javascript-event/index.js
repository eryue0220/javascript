var a = document.getElementsByClassName('one')
var b = document.getElementsByClassName('three')
var ul = document.getElementsByTagName('ul')
var body = document.body;

b[0].addEventListener('click', function(e) {
    console.log('b', e);
}, true);

ul[0].addEventListener('click', function(e) {
    console.log('ul', e);
}, true);

a[0].addEventListener('click', function(e) {
    alert(e)
}, false);