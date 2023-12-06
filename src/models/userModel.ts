import mongoose from 'mongoose';

// name, password, email, confirmPassword, photo
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'Please Enter a Password']
    }
});

export const UserModel = mongoose.model('User', userSchema);

// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// export const deletUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
