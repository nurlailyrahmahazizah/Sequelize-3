
const memberModel = require('../models/index').member

const Op = require('sequelize').Op
const path = require('path')
const fs = require('fs')
const { error } = require('console')
const member = require('../models/member')
const upload = require(`./upload-cover`).single(`profile`)

exports.getAllMember = async (request, response) => {
    let members = await memberModel.findAll()
    return response.json({
        success: true,
        data: members,
        message: 'All Members have been loaded'
    })
}

exports.findMember = async (request, response) => {
    let keyword = request.body.keyword
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } },
            ]
        }
    })
    return response.json({
        success: true,
        data: members,
        message: 'All Members have been loaded'
    })
}
let validateMember = require(`../middlewares/member-validation`)
exports.addMember = (request, response) => {
    try {
        upload(request, response, async error => {
            if (error) {
                return response.json({ message: error })
            }
            if (!request.file) {
                return response.json({ message: `Nothing to upload` })
            }

            let validation = validateMember(request)
            if (!validation.status) {
                return response.json({ status: false, message: validation.message })
            }

            let newMember = {
                profile: request.file.filename,
                name: request.body.name,
                address: request.body.address,
                gender: request.body.gender,
                contact: request.body.contact,
            }
            memberModel.create(newMember)
                .then(result => {
                    return response.json({
                        success: true,
                        data: result,
                        message: 'New member has been inserted'
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}

exports.updateMember = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }

        let dataMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact
        }
        if (request.file) {
            const selectedMember = await memberModel.findOne({ where: { id: id } })
            const oldProfile = selectedMember.profile
            const pathProfile = path.join(__dirname, `../cover`, oldProfile)
            if (fs.existsSync(pathProfile)) {
                fs.unlink(pathProfile, error => console.log(error))
            }
            member.profile = request.file.filename
        }
        let idMember = request.params.id
        memberModel.update(dataMember, { where: { id: idMember } })
            .then(result => {
                return response.json({
                    success: true,
                    message: 'Data Member has been updated'
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}
exports.deleteMember = async (request, response) => {
    let idMember = request.params.id

    const member = await memberModel.findOne({ where: { id: idMember } })
    const oldProfile = member.profile
    const pathProfile = path.join(__dirname, `../cover`, oldProfile)

    if (fs.existsSync(pathProfile)) {
        fs.unlink(pathProfile, error => console.log(error))
    }
    memberModel.destroy({ where: { id: idMember } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data member has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}