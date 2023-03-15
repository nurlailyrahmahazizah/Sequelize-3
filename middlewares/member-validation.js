/** load Joi Library */
const Joi = require(`joi`)

/** create function to validate request of member */
const validateMember = (request) => {
    /** define rules for request */
    const rules = Joi
        .object()
        .keys({
            /** name is required */
            name: Joi.string().required(),
            /** address is required */
            address: Joi.string().required(),
            /** contact is number only and required */
            contact: Joi.number().required(),
            /** gender is only "Male" and "Female" allowed */
            gender: Joi.string().valid(`Laki-laki`, `Perempuan`)
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
    return { status: true }
}
module.exports = validateMember
