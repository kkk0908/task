
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, default: "", unique: true, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String },
    role: { type: String, required: true, default: "user", enum: ["user", "admin"] }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },

})


const User = mongoose.model("User", userSchema)
User.createIndexes()
module.exports = User