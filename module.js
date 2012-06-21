Module = Class.extend((function(){
	var _init = function(sandbox, options){
			if (!sandbox || !(sandbox instanceof Sandbox)) throw new TypeError("Sandbox");
			this.sandbox = sandbox;
		},
		_initCallbacks = function(sandbox, options, callbacks){
			if (!options || !options.subscribesTo) {
				return;
			}
			var i;
			for (i = 0; i < options.subscribesTo.length; i++){
				var message = options.subscribesTo[i];
				if (typeof callbacks[message] === "undefined"){
					throw new ReferenceError();					
				}
				sandbox.subscribe(message, callbacks[message]);
			}			
		};
	return {
		initialize: function(sandbox, options){
			_init(sandbox, options);
			_initCallbacks(sandbox, options, this.callbacks || {});
		}
	}
})());