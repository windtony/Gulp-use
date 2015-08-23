var text=function callee(){
	alert(111);
	return callee();
}();
var test=function call(){
	alert(111);
	return call();
}();
//2015-8-23 12:54:16