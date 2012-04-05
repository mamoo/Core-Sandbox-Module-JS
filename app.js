/* 
* CORE-SANDBOX-MODULE Pattern implementation
* see readme.md for references.
*/

/**
 * Define namespace.
 */
var App = App || {};

/*
* @description Sandbox object, the API of this object is available to modules.
*              see readme.md for reference.
*/
App.Sandbox = function(core) {
    /** @private */ _publish = function(messageID, args) {
        core.publish(messageID, args);
    },
    /** @private */ _subscribe = function(messageID, handler, scope) {
        core.subscribe(messageID, handler, scope);
    };

    return {
        DOM: core.DOM,
        publish: _publish,
        subscribe: _subscribe,
    };
};


/*
* @description Core object, the API of this object is available to sandboxes.
*              see readme.md for reference.
* @param {object} base: base library (jquery is used here).
*/
App.Core = function(base) {
    var /** @private */ moduleData = {},
        /** @private */ cache = {}, 
        /** @private */ _dom = {
            find: function(selector) {
                return base(selector);
            },
            wrap: function(element) {
                return base(element);
            }
        },
        /** @private */ _utilities = {
            merge: base.extend,
            grep: base.grep,
            inArray: base.inArray,
            each: base.each
        };

    return {
        DOM: _dom,
        utilities: _utilities,
        register: function(moduleId, creator) {
            moduleData[moduleId] = {
                creator: creator,
                instance: null
            };
        },
        start: function(moduleId) {
            console.log("Starting " + moduleId);
            moduleData[moduleId].instance = moduleData[moduleId].creator(new App.Sandbox(this));
            moduleData[moduleId].instance.init();
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
                base.each(cache[message], function() {
                    if (args instanceof Array) {
                        this.apply(this, args || []);
                    } else {
                        this.apply(this, [args]);
                    }
                });
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