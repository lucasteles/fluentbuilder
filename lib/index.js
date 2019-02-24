"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = require("./random");
var deprecated_decorator_1 = require("deprecated-decorator");
var Builder = /** @class */ (function () {
    function Builder() {
        this.rules = [];
    }
    Builder.prototype.from = function (shape) {
        return this.addShape(shape);
    };
    Builder.prototype.addShape = function (shape) {
        this.rules.push(shape);
        return this;
    };
    Builder.prototype.ruleFor = function (property, v) {
        var value = v instanceof Function ? v() : v;
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
            return _this.rules.reduce(function (a, b) { return (__assign({}, a, b())); }, {});
        };
        return (qtd) ?
            Array.apply(0, Array(qtd)).map(function () { return generate(); })
            : generate();
    };
    Builder.prototype.generateRandom = function (qtdMin, qtdMax) {
        var rand = random_1.default(qtdMin, qtdMax);
        return this.generate(rand);
    };
    Builder.create = function (shape) {
        return exports.createBuilder(shape);
    };
    __decorate([
        deprecated_decorator_1.default("addShape")
    ], Builder.prototype, "from", null);
    __decorate([
        deprecated_decorator_1.default("use createBuilder standalone function instead")
    ], Builder, "create", null);
    return Builder;
}());
exports.default = Builder;
exports.createBuilder = function (shape) { return new Builder().addShape(shape); };
function generate(shape, qtd) {
    return exports.createBuilder(shape).generate(qtd);
}
exports.generate = generate;
function generateRandom(shape, qtdMin, qtdMax) {
    return exports.createBuilder(shape).generateRandom(qtdMin, qtdMax);
}
exports.generateRandom = generateRandom;
