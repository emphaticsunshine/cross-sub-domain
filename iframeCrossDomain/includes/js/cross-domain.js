/* 
Author:Mohit Seth
Version : 1.1
Date : '02/10/2012'
Performs sub domain call using an iframe.

Usage:
	Create new object of CrossDomain object passing the initial parameters
	E.g:
	var cd = new CrossDomain($("#frameID"),$("#targetDivID"),"http://xyz.com",callbackFunction);
	cd.getFrameContent();		//this function will perform all the operations required.
	
	
	Important: document.domain has to be set to same on both sides.
*/

var CrossDomain = function(frameObj,targetDiv,url,callback){
	this.frameObj = frameObj;
	this.version ='1.1';
	this.date = '02/10/2012';
	this.targetDiv= targetDiv;
	this.callback = callback;
	this.url = url;
};

/* This Function gets the content for iframe and replaces to the target div element */

CrossDomain.prototype.getFrameContent = function(){
	try{
		this.frameObj = this.frameObj[0];
		this.frameObj.src = this.url;
		this.replaceContent();
	}
	catch(err){
	}
};

/* This function is a callback function for loading 
the iframe. This function is called to replace 
content to target div and call the callback function
if specified */

CrossDomain.prototype.replaceContent = function(){
	var obj = this;
	$(this.frameObj).load(function(){
		obj.targetDiv.html(this.contentWindow.document.body.innerHTML);
		if(typeof this.callback !== 'undefined'){
			callback();
		}
	});
}
