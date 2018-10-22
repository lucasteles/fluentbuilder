"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Builder {
    constructor() {
        this.rules = [];
    }
    from(gen) {
        this.rules.push(gen);
        return this;
    }
    ruleForFunc(property, v) {
        let pName = '';
        const handler = {
            get: (_, name) => { pName = name; }
        };
        const proxy = new Proxy({}, handler);
        property(proxy);
        const factory = () => ({ [pName]: v() });
        this.from(factory);
        return this;
    }
    ruleForStr(property, v) {
        const factory = () => ({ [property]: v() });
        this.from(factory);
        return this;
    }
    ruleFor(property, v) {
        return typeof (property) == "function"
            ? this.ruleForFunc(property, v)
            : this.ruleForStr(property, v);
    }
    generate(qtd) {
        const generate = () => this.rules.reduce((a, b) => (Object.assign({}, a, b())), {});
        if (qtd) {
            return Array(qtd)
                .fill(undefined)
                .map(() => generate());
        }
        else {
            return generate();
        }
    }
}
exports.default = Builder;
