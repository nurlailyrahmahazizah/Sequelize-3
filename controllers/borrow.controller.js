const { request, response } = require("express")

/** load model for `borrow` table */
const borrowModel = require(`../models/index`).borrow
const memberModel = require(`../models/index`).member
/** load model for `details_of_borrow` table */
const detailsOfBorrowModel = require(`../models/index`).details_of_borrow
/** load Operator from Sequelize */
const Op = require(`sequelize`).Op

exports.addBorrowing = async(request, response) => {
    let newData = {
        memberID: request.body.memberID,
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status
    }
    borrowModel.create(newData)
        .then(result => {
            let borrowID = result.id
            let detailsOfBorrow = request.body.details_of_borrow
            for (let i = 0; i < detailsOfBorrow.length; i++) {
                detailsOfBorrow[i].borrowID = borrowID
                
            }
            detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
                .then(result => {
                    return response.json({
                        success: true,
                        message: `New Book borrowed has been inserted`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.updateBorrowing = async (request, response) => {
    let newData = {
        memberID: request.body.memberID,
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status
    }
    let borrowID = request.params.id

    borrowModel.update(newData, { where: { id: borrowID } })
        .then(async result => {
            await detailsOfBorrowModel.destroy(
                { where: { borrowID: borrowID}}
            )
            let detailsOfBorrow = request.body.details_of_borrow
            for (let i = 0; i < detailsOfBorrow.length; i++) {
                detailsOfBorrow[i].borrowID = borrowID
            }
            detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
                .then(result => {
                    return response.json({
                        success: true,
                        message: `Book borrowed has ben update`
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteBorrowing = async (request, response) => {
    let borrowID = request.params.id
    detailsOfBorrowModel.destroy(
        {where: {borrowID: borrowID}}
    )
    .then(result => {
        borrowModel.destroy({ where: { id: borrowID}})
            .then(result => {
                return response.json({
                    success: true,
                    message: `Borrowing book's has deleted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.returnBook = async (request, response) => {
    let borrowID = request.params.id
    let today = new Date()
    let currentDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

    borrowModel.update(
        {
            date_of_return: currentDate,
            status: true
        },
        {
            where: {id: borrowID}
        }
    )
        .then(result => {
            return response.json({
                success: true,
                message: `Book has been returned`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.getBorrow = async (request, response) => {
    let data = await borrowModel.findAll(
        {
            include: [
                `member`, `admin`,
                {
                    model: detailsOfBorrowModel,
                    as: `details_of_borrow`,
                    include: [`book`]
                }
            ]
        }
    )
    return response.json({
        success: true,
        data: data,
        message: `All borrowing book have been loaded`
    })
}

exports.findBorrow = async(request, response) => {
    let keyword = request.body.keyword
    let data = await borrowModel.findAll(
        {
            include: [
                `admin`,
                {
                    model: memberModel,
                    as: `member`,
                    where: {
                        [Op.or]: [
                            {name: {[Op.substring]: keyword}}
                        ]
                    }
                },
                {
                    model: detailsOfBorrowModel,
                    as: `details_of_borrow`,
                    include: [`book`]
                }
            ]
        }
    )
    return response.json({
        success: true,
        data: data,
        message: `All borrowing book have been loaded`
    })
}