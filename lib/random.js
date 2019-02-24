"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomInt(qtdMin, qtdMax) {
    var rand = qtdMax
        ? Math.random() * (qtdMax - qtdMin) + qtdMin
        : (Math.random() * qtdMin);
    return Math.floor(rand);
}
exports.default = randomInt;
