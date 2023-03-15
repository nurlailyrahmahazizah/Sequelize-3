/** load Joi Library */
const Joi = require(`joi`)

/** create function to validate request of admin */
const validateBook = (request) => {
    /** define rules for request */
    const rules = Joi
    .object()
    .keys({
        /** name is required */
        isbn: Joi.string().required(),
        /** contact is required */
        title: Joi.string().required(),
        /** address is required */
        author: Joi.string().required(),
        /** username is required */
        publisher: Joi.string().required(),
        /** password is required */
        category: Joi.string().required(),
        // stok is number only and required
        stock: Joi.number().required()
    })
    .options({ abortEarly: false })
    /** get error of validation if it exists */
    let { error } = rules.validate(request.body)
    /** if error is exist */
    if (error != null) {
        /** get all error message */
        let errMessage = error.details.map(it =>
        it.message).join(",")
        return { status: false, message: errMessage }
    }
    /** if error doesn't exist, continue to controller */
    return {status: true}
}
module.exports = validateBook
