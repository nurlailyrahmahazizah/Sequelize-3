/** load Joi Library */
const Joi = require(`joi`)

/** create function to validate request of admin */
const validateAdmin = (request, response, next) => {
    /** define rules for request */
    const rules = Joi
    .object()
    .keys({
        /** name is required */
        name: Joi.string().required(),
        /** contact is number only and required */
        contact: Joi.number().required(),
        /** address is required */
        address: Joi.string().required(),
        /** username is required */
        username: Joi.string().required(),
        /** password is required */
        password: Joi.string().required()
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
module.exports = { validateAdmin }
