var text=function callee(){
	alert(111);
	return callee();
}();