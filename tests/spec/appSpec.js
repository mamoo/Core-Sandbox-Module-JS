describe("App.Core", function() {
  beforeEach(function() {

  });

  it("should be able to register a module", function() {
    var MyModule = Class.extend(Module, {
      initialize:function(sandbox, options){
        this.parent(sandbox, options);
      },
      callbacks: {
        a : function(){}
      }
    });

    spyOn(Core, 'register').andCallThrough();
    Core.register('module', MyModule);
    expect(Core.register).toHaveBeenCalled();
  });

  it("should be able to start a single module", function() {
    var i = 0;
    var MyModule = Class.extend(Module, {
      initialize:function(sandbox, options){
        this.parent(sandbox, options);
        i++
      },
      callbacks: {
        a : function(){}
      }
    });

    spyOn(Core, 'register').andCallThrough();
    Core.register('module', MyModule);
    Core.startAll();
    expect(Core.register).toHaveBeenCalled();
    expect(i).toBe(1);
  }); 
});
