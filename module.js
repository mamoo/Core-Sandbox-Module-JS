Module = Class.extend((function(){
	var _init = function(sandbox, options){
		if (!sandbox || !(sandbox instanceof Sandbox)) throw new TypeError("Sandbox");
		this.sandbox = sandbox;
	},
	_initSubscribedMessagesCallbacks = function(sandbox, subscribesTo){
		if (typeof subscribesTo === "undefined") return; 
		for (var callback in subscribesTo){
	    		if (subscribesTo.hasOwnProperty(callback)) {                
				if (typeof subscribesTo[callback] !== "function"){
					throw new TypeError(callback + "is not a function");					
				}
				sandbox.subscribe(callback, subscribesTo[callback]);
	    		}
		}			
	};

	return {
		initialize: function(sandbox, options){
			if (typeof this.init === "function") {
				this.init(sandbox, options);
			}
			_init(sandbox, options);
			_initSubscribedMessagesCallbacks(sandbox, this.subscribesTo || {});
		}
	}
})());