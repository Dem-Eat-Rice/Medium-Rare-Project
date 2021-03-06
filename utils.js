const csrf = require("csurf");
const { validationResult, check } = require("express-validator");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// const handleValidationErrors = (req, res, next) => {
//     const validationErrors = validationResult(req);
//     if(!validationErrors.isEmpty()) {
//         const errors = validationErrors.array().map((error) => error.msg);
//         const err = Error("Bad Request");
//         err.status = 400;
//         err.title = "Bad Request";
//         err.errors = errors;
//         return next(err);
//     }
//     next();
// }
module.exports = { asyncHandler, csrfProtection, validationResult, check };