const Utils = {
	url: {
		getParam: function(name) {
			//	针对地址有"?"情况
			var arr = window.location.search.substring(window.location.search.indexOf('?') + 1,window.location.search.length);
			if (typeof name !== "undefined") {
				var reg = new RegExp(name + "=([^&]*)");
	    		var r = arr.match(reg);
	    		if (r!=null) return unescape(r[1]); return null;
			} else {
				var theRequest = {};
	    		if(arr.length > 0){
					var strs = arr.split("&");
		    		for (var i = 0; i < strs.length; i++) {
		    			var tmpStrs = strs[i].split("=");
		    			if (tmpStrs.length > 2) {
		    				var string = strs[i].split(tmpStrs[0] + "=");
		    				theRequest[tmpStrs[0]] = string[1];
		    			} else {
		    				theRequest[tmpStrs[0]] = tmpStrs[1];
		    			}
		    		}
	    		}
	    		return theRequest;
			}
		}
	}
}
export default Utils