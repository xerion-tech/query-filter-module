"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAdapter = void 0;
const ValidationUtils_1 = require("../shared/utils/ValidationUtils");
class BaseAdapter {
    validateField(field, config) {
        ValidationUtils_1.ValidationUtils.validateField(field, config);
    }
    validateOperator(field, operator, config) {
        ValidationUtils_1.ValidationUtils.validateOperator(field, operator, config);
    }
}
exports.BaseAdapter = BaseAdapter;
//# sourceMappingURL=BaseAdapter.js.map