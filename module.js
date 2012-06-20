Module = Class.extend({
	initialize: function(sandbox, options){
		if (!sandbox || !(sandbox instanceof Sandbox)) throw new TypeError("Sandbox");
		this.sandbox = sandbox;

		if (options && options.subscribesTo) {
			var i;
			for (i = 0; i < options.subscribesTo.length; i++){
				var message = options.subscribesTo[i];
				if (typeof this.callbacks[message] === "undefined")
					throw new ReferenceError();
				sandbox.subscribe(message, this.callbacks[message]);
			}
		}
	}
});