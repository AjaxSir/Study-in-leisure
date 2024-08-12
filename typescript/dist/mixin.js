"use strict";
// Disposable Mixin
class Disposable {
    dispose() {
        this.isDisposed = true;
    }
}
// Activatable Mixin
class Activatable {
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}
class SmartObject {
    constructor() {
        // Disposable
        this.isDisposed = false;
        // Activatable
        this.isActive = false;
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }
    interact() {
        this.activate();
    }
}
applyMixins(SmartObject, [Disposable, Activatable]);
let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);
////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
