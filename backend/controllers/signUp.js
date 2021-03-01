
const signUpController = {};
const userModelMethod = require("../models/user")
const errorHandler = require("../utils/errorHandler")
const httpStatus = require("../constants/httpStatus")
const hashingHandler = require("../utils/hashingHandler")
const fileHandler = require("../utils/fileHandler")
const folderMaker = require("../utils/folderMaker")
const path = require('path')
const fs = require('fs')

signUpController.signUp = async ({ fields, files }) => {
    try {

        let user = fields
        let file = files.image

        let existedEmail = await userModelMethod.findUserByCond({ email: user.email })
        if (existedEmail) return { ...httpStatus.OK, message: "Email Already Existed" }

        let existedMobile = await userModelMethod.findUserByCond({ mobile: user.mobile })
        if (existedMobile) return { ...httpStatus.OK, message: "Mobile Already Existed" }

        await folderMaker.createFolder("user")

        if (file) {
            let fileName = path.join("user", `user_${Date.now()}${path.extname(file.name)}`);
            let newPath = path.join(__dirname, "..", "public", fileName);
            let oldPath = file.path;
            let fileInfo = await fileHandler.imageHandler(newPath, fileName, oldPath);
            user.image = fileInfo.fileName;
        }

        user.password = await hashingHandler.hashingValue(user.password)
        let userObj = await userModelMethod.insertUser(user)
        delete userObj._doc.password
        return { ...httpStatus.OK, message: "signUp Successfull!", userObj }
    } catch (error) {
        console.log(error);
        return errorHandler.errorHandlerMain(error)
    }
}

module.exports = signUpController;