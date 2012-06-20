Core-Sandbox-Module Pattern Implementation
==========================================

INDEX
-------
1. SUMMARY
2. DESCRIPTION
3. HOW-TO

SUMMARY
-------
A quite basic implementation of Core-Sandbox-Module pattern.
API is based on talks and slides by N. Zakas[1] and Eric Shepherd[2].
This implementation heavily relies upon a correct use of the
revealing module pattern [3], and upon the publish/subscribe
pattern.
Base library (jQuery is used here) is lightly abstracted from
sandbox and modules; some main functions are exposed 
like sandbox.DOM.find(selector) which is equivalent to $().

DESCRIPTION
-----------
Aim of the pattern is providing a loosely coupled architecture for JS
applications.

Architecture components are:

1. Base library
   Provides cross-browser functionalities. *JQuery* is used here.

2. Core object
   Is responsible for:
   - Registering modules
   - Starting modules
   - Stopping modules
   - Indirectly handling (via sandbox) pub/sub of messages
   - Exposing some basic functions of base lib to sandbox 

3. Sandbox
   Sandbox is responsible for:
   - Providing access to common features to modules
   - Provide a pub/sub API to modules
   - Exposing some basic functions of core's base lib to sandbox 

4. Module(s)
   Each module is defined by a Module Creator function, knows only about its Sandbox
   and is subject to these rules:
   * Hands to yourself
      – Only call your own methods or those on the sandbox
      – Don't access DOM elements outside of your box
      - Don't access non-native global objects
   * Ask, don't take
      - Anything else you need, ask the sandbox
   * Don't leave your toys around
      – Don't create global objects
   * Don't talk to strangers
      – Don't directly reference other modules
      - Don't mess with other module's markup


HOW TO USE IT
-------------
Basically is all about:

1. Defining modules
2. Registering modules
3. Starting/stopping modules
    
### MODULE DEFINITION: ###
     var MyModule = function (sandbox){
         return {
            init: function(){
                //Module initialization
            },
     
            destroy: function(){
                //Module destruction
            }
            
            // put your code here, and use your sandbox as needed...     
        };
    }

You can only have one unique name per module.

### MODULE REGISTRATION: ###
	Core.register("myModule", MyModule);
 

### APPLICATION START: ###
	Core.startAll();


REFERENCES
----------

[1] Nicholas Zakas' Core-Sandbox-Module
- http://msdn.microsoft.com/en-us/scriptjunkie/gg314983
- http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture

[2] Building a JavaScript Module Framework at Gilt
- http://www.slideshare.net/ericshepherd/building-a-javascript-module-framework-at-gilt
 
[3] Christian Heilmann’s Revealing-module pattern 
- http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript