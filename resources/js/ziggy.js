const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"home":{"uri":"\/","methods":["GET","HEAD"]},"about":{"uri":"about","methods":["GET","HEAD"]},"users.index":{"uri":"users","methods":["GET","HEAD"]},"users.create":{"uri":"users\/create","methods":["GET","HEAD"]},"users.store":{"uri":"users","methods":["POST"]},"users.show":{"uri":"users\/{user}","methods":["GET","HEAD"],"parameters":["user"],"bindings":{"user":"id"}},"users.edit":{"uri":"users\/{user}\/edit","methods":["GET","HEAD"],"parameters":["user"],"bindings":{"user":"id"}},"users.update":{"uri":"users\/{user}","methods":["PUT","PATCH"],"parameters":["user"],"bindings":{"user":"id"}},"users.destroy":{"uri":"users\/{user}","methods":["DELETE"],"parameters":["user"],"bindings":{"user":"id"}},"login":{"uri":"login","methods":["POST"]},"logout":{"uri":"logout","methods":["DELETE"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
