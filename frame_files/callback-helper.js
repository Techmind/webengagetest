var escapeNewLine = function (string) {
	return string.replace(/[\\]/g, '\\\\')
	.replace(/[\"]/g, '\\\"')
	.replace(/[\/]/g, '\\/')
	.replace(/[\b]/g, '\\b')
	.replace(/[\f]/g, '\\f')
	.replace(/[\n]/g, '\\n')
	.replace(/[\r]/g, '\\r')
	.replace(/[\t]/g, '\\t');
};

var stringify = function (obj) {
	if (typeof JSON !== 'undefined' && typeof JSON.stringify === 'function') {
		return JSON.stringify(obj);
	} else {
		var type = typeof (obj);
		if (type != "object" || obj === null) {
			// simple data type
			if (type == "string") obj = '"' + escapeNewLine(obj) + '"';
			return String(obj);
		} else {
			// recurse array or object
			var n, value, json = [],
			arr = (obj && obj.constructor == Array),
			dt = (obj && obj instanceof Date);
			if (arr) {
				for (var i = 0; i < obj.length; i++) {
					value = obj[i];
					type = typeof (value);
					if (type == "string") value = '"' + escapeNewLine(value) + '"';
					else if (type == "object" && value !== null) value = stringify(value);
					json.push(String(value));
				}
			} else if (dt) {
				return dt.toString();
			} else {
				for (n in obj) {
					value = obj[n];
					type = typeof (value);
					if (type == "string") value = '"' + value + '"';
					else if (type == "object" && value !== null) value = stringify(value);
					json.push('"' + n + '":' + String(value));
				}            	  
			}              
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}	
	}						
};

var getFeedbackTransportData = function (eventName, eventData) {
	var transportJson = {
			"type" : "load",
			"eventName" : eventName,
			"data" : {
				"frameName" : "webklipper-publisher-widget-container-frame",
				"height" : $('.wrapper').height(),
				"width" : $('.wrapper').width()
			}
	};
	if (typeof eventData !== 'undefined' && eventData) {
		transportJson.data["response"] = eventData;
	}
	return stringify(transportJson);
};

var transportJson = "";
var requestSentFlag = false;

window.resetRequestFlag = function() {
	requestSentFlag = false;
};

window.clearTransportHelperIframe = function (iframeWindow) {
  iframeWindow.sendFeedbackTransportDataHelper(transportJson);
  $(iframeWindow).remove();
	$('#callback-helper-frame').remove();
  if (frames['callback-helper-frame']) {
    delete frames['callback-helper-frame'];
  }
}

var sendFeedbackTransportData = function (eventName, pageUrl, data) { 
	sendTransportData("we-feedback-callback-frame", eventName, pageUrl, data);
};

var sendSurveyTransportData = function (eventName, pageUrl, data) {
	sendTransportData("we-survey-callback-frame", eventName, pageUrl, data);
};

var sendTransportData = function (callbackFrameName, eventName, pageUrl, data) {
	if (typeof window.postMessage !== 'undefined') {
		sendPostMessage(callbackFrameName, eventName, pageUrl, data);
	} else {
			if(!requestSentFlag) {
				sendWindowName(callbackFrameName, eventName, data);
			} else {
				var clbInt = setInterval(function(){
					if(!requestSentFlag) {
						clearInterval(clbInt);
						sendWindowName(callbackFrameName, eventName, data);
					}
				}, 20);
			}
	}	
}


var sendPostMessage = function (callbackFrameName, eventName, pageUrl, data) {
	setTimeout(function () {
		window.parent.frames[callbackFrameName].postMessage(getFeedbackTransportData(eventName, data), pageUrl); // TODO - add a callbackFrame for communication and use frames[callbackFrameName]
	}, 200);
};

var sendWindowName = function (callbackFrameName, eventName, data) {
	setTimeout(function () {
		transportJson = getFeedbackTransportData(eventName, data);
		window.parent.frames[callbackFrameName].callback(transportJson);		
	}, 200);
	requestSentFlag = true;
};

var replaceGTLT = function (obj) {	
	var newObj = {};
	var replace = function (str) {
		return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
	};
	if (typeof obj === 'string'){
		return replace(obj);
	} else if (typeof obj === 'number' || typeof obj === 'boolean') {
		return obj;
	} else if (obj && obj.constructor == Array) {		
		var newArray = [];
		if (obj.length > 0) {
			for (var index =0; index < obj.length; index++) {
				newArray.push(replaceGTLT(obj[index]));				
			}
		}
		return newArray;
	} else {
		var newObj = {};
		for (key in obj) {
			var newKey = (typeof key === 'string' ? replace(key) : key);
			newObj[newKey] = replaceGTLT(obj[key]);
		}
		return newObj;
	}
};