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

  it("checks for callback presence when list of events to be subscribed is passed through options", function(){
	var foo = function(){ 
	  new Module(
		new Sandbox(Core), 
		{ subscribesTo: ["a","b","c"] }
	  ); 
	};
	expect(foo).toThrow();
  });

  it("automatically subscribes to a list of events if passed through options", function(){
	var MyModule = Class.extend(Module, {
	  	initialize:function(sandbox, options){
			this.parent(sandbox, options);
	  	},
	  	callbacks:{
				a: function(){

				},
				b: function(){

				},
				c: function(){

				}
		}
	});

	var foo = function(){ 
	  new MyModule(
		new Sandbox(Core), 
		{ subscribesTo: ["a","b","c"] }
	  ); 
	};
	expect(foo).not.toThrow();
  });  

  it("is able to receive a subscribed message", function(){
	var i = 0;
	var MyModule = Class.extend(Module, {
	  initialize:function(sandbox, options){
		this.parent(sandbox, options);
	  },
	  callbacks: {
		a : function(){
		  i++;
		}
	  }
	});
	var myModule = new MyModule(
		new Sandbox(Core), 
		{ subscribesTo: ["a"] }
	  ); 
	Core.publish("a");
	expect(i).toBe(1);
  });    
});