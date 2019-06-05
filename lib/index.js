"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = require("./random");
var faker = require("faker");
var Builder = /** @class */ (function () {
    function Builder() {
        this.rules = [];
    }
    Builder.prototype.addShape = function (shape) {
        this.rules.push(shape);
        return this;
    };
    Builder.prototype.ruleFor = function (property, v) {
        var value = v instanceof Function ? v(faker) : v;
        var factory = function () {
            return (_a = {}, _a[property] = value, _a);
            var _a;
        };
        this.addShape(factory);
        return this;
    };
    Builder.prototype.generate = function (qtd) {
        var _this = this;
        var generate = function () {
            return _this.rules.reduce(function (a, b) { return (__assign({}, a, b(faker))); }, {});
        };
        return (qtd) ?
            Array.apply(0, Array(qtd)).map(function () { return generate(); })
            : generate();
    };
    Builder.prototype.generateRandom = function (qtdMin, qtdMax) {
        var rand = random_1.default(qtdMin, qtdMax);
        return this.generate(rand === 0 ? 1 : rand);
    };
    return Builder;
}());
exports.default = Builder;
function createBuilder(shape) {
    return new Builder().addShape(shape);
}
exports.createBuilder = createBuilder;
function generate(shape, qtd) {
    return createBuilder(shape).generate(qtd);
}
exports.generate = generate;
function setLocale(locale) {
    faker.locale = locale;
}
exports.setLocale = setLocale;
function generateRandom(shape, qtdMin, qtdMax) {
    return createBuilder(shape).generateRandom(qtdMin, qtdMax);
}
exports.generateRandom = generateRandom;
