import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    gender: String,
    appointments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointments" }]
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User;