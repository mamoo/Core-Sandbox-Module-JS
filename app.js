/* 
* CORE-SANDBOX-MODULE Pattern implementation
* see readme.md for references.
*/

/*
* @description Sandbox object, the API of this object is available to modules.
*              see readme.md for reference.
*/
Sandbox = Class.extend({
	initialize: function(core) {
		this.publish = core.publish;
		this.subscribe = core.subscribe;
		this.dom = core.dom;
	}
});


/*
* @description Core object, the API of this object is available to sandboxes.
*              see readme.md for reference.
* @static
* @param {object} base: base library (jquery is used here).
*/
Core = function(_$) {
	var moduleData = {},
		cache = {}, 
		_dom = {
			find: function(selector) {
				return _$(selector);
			},
			wrap: function(element) {
				return _$(element);
			}
		},
		_utilities = {
			merge: _$.extend,
			grep: _$.grep,
			inArray: _$.inArray,
			each: _$.each
		};

	return {
		dom: _dom,
		utilities: _utilities,
		register: function(moduleId, creator, options) {
			moduleData[moduleId] = {
				creator: creator,
				instance: null,
				options: options || {}
			};
		},
		/**
		 * Starts a single module
		 * @param {string} moduleId The module identifier
		 */
		start: function(moduleId) {
			console.log("Starting " + moduleId);
			moduleData[moduleId].instance = new moduleData[moduleId].creator(new Sandbox(this), moduleData[moduleId].options);
		},
		stop: function(moduleId) {
			var data = moduleData[moduleId];
			if (data.instance) {
				data.instance.destroy();
				data.instance = null;
			}
		},
		startAll: function() {
			for (var moduleId in moduleData) {
				if (moduleData.hasOwnProperty(moduleId)) {
					this.start(moduleId);
				}
			}
		},
		stopAll: function() {
			for (var moduleId in moduleData) {
				if (moduleData.hasOwnProperty(moduleId)) {
					this.stop(moduleId);
				}
			}
		},
		publish: function(message, args) {
			try {
					var i;
					for (i = 0; i < cache[message].length; i++) {
						if (typeof args === "undefined") { args = []; }
						if (!(args instanceof Array)) {
							args = [args];
						}
						cache[message][i].apply(this, args);
					};
			} catch (err) {
				console.log(err);
			}
		},
		subscribe: function(message, callback) {
			if (!cache[message]) {
				cache[message] = [];
			}
			cache[message].push(callback);
			return [message, callback];
		},
		unsubscribe: function(handle) {
			var t = handle[0];
			base.each(cache[t], function(idx) {
				if (this == handle[1]) {
					cache[t].splice(idx, 1);
				}
			});
		}
	};
} (jQuery);