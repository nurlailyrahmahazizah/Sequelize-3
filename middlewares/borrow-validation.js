/** load Joi Library */
const Joi = require(`joi`)

/** create function to validate request of admin */
const validateBorrow = (request, response, next) => {
    /** define rules for request */
    const rules = Joi
    .object()
    .keys({
        /** name is number only and required */
        memberID: Joi.number().required(),
        /** contact is number only and required */
        adminID: Joi.number().required(),
        /** address is date only and required */
        date_of_borrow: Joi.date().required(),
        status: Joi.required(),
        details_of_borrow: Joi.required(),
        /** username is date only and req.uired */
        date_of_return: Joi.required()
    })
    .options({ abortEarly: false })
    /** get error of validation if it exists */
    let { error } = rules.validate(request.body)
    /** if error is exist */
    if (error != null) {
        /** get all error message */
        let errMessage = error.details.map(it =>
        it.message).join(",")
        /** return error message with code 422 */
        return response.status(422).json({
        success: false,
        message: errMessage
        })
    }
    /** if error doesn't exist, continue to controller */
    next()
}
module.exports = { validateBorrow }
