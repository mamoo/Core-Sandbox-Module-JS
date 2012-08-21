describe("A Module", function() {
	beforeEach(function() {

	});

	it("rejects bad type sandboxes", function() {
		var foo = function(){ 
			new Module("sss"); 
		};
		expect(foo).toThrow();
	});

	it("accepts no options", function(){
		var foo = function(){ 
			new Module(new Sandbox(Core)); 
		};
		expect(foo).not.toThrow();
	});

	it("can have its own initialization function", function(){
		var i = 0;    	
		var MyModule = Class.extend(Module, {
		  	init:function(sandbox, options){
				i++;	
		  	}
		});
		var foo = function(){ 
			new MyModule(new Sandbox(Core)); 
		};
		expect(foo).not.toThrow();
		expect(i).toBe(1);
	});

	it("automatically subscribes to a list of messages by defining the corresponding callbacks, and is able to receive a subscribed message", function(){
		var i = 0;
		var MyModule = Class.extend(Module, {
			subscribesTo: {
				a : function(){
					console.log("called!");
					i++;
				}
		  	}
		});
		var myModule = new MyModule(new Sandbox(Core)); 
		Core.publish("a");
		expect(i).toBe(1);
	});    
});