import bcrypt from 'bcrypt';

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { config } from '../../../config/config';
import { User } from '../user/user.model';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { id, password } = payload;
    //hashing form given password
    const salt = bcrypt.genSaltSync(parseInt(config.bcrypt.bycrypt_salt_rounds));
    const hashedGivenPassword = bcrypt.hashSync(password, salt);
    //creating instance of User
    const user = new User();
    // access to our instance methods
    const isUserExist = await User.isUserExist(id);

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    if (isUserExist.password && (await User.isPasswordMatched(hashedGivenPassword, isUserExist.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    //create access token & refresh token

    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers.createToken({ userId, role }, config.secret.secret as Secret, config.secret.expires_in as string);

    const refreshToken = jwtHelpers.createToken({ userId, role }, config.secret.refresh_token as Secret, config.secret.refresh_expires_in as string);

    return {
        accessToken,
        refreshToken,
        needsPasswordChange
    };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(token, config.secret.refresh_token as Secret);
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }

    const { userId } = verifiedToken;

    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token

    const isUserExist = await User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    //generate new token

    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExist.id,
            role: isUserExist.role
        },
        config.secret.secret as Secret,
        config.secret.expires_in as string
    );

    return {
        accessToken: newAccessToken
    };
};

// const changePassword = async (user: JwtPayload | null, payload: IChangePassword): Promise<void> => {
//     const { oldPassword, newPassword } = payload;

// // checking is user exist
// const isUserExist = await User.isUserExist(user?.userId);

//alternative way
// const isUserExist = await User.findOne({ id: user?.userId }).select('+password');

// if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
// }

// checking old password
// if (isUserExist.password && !(await User.isPasswordMatched(oldPassword, isUserExist.password))) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
// }

// // hash password before saving
// const newHashedPassword = await bcrypt.hash(
//   newPassword,
//   Number(config.bycrypt_salt_rounds)
// );

// const query = { id: user?.userId };
// const updatedData = {
//   password: newHashedPassword,  //
//   needsPasswordChange: false,
//   passwordChangedAt: new Date(), //
// };

// await User.findOneAndUpdate(query, updatedData);
// data update
//     isUserExist.password = newPassword;
//     isUserExist.needsPasswordChange = false;

//     // updating using save()
//     isUserExist.save();
// };

// const forgotPass = async (payload: { id: string }) => {
//     const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });

//     if (!user) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
//     }

//     let profile = null;
//     if (user.role === ENUM_USER_ROLE.ADMIN) {
//         profile = await Admin.findOne({ id: user.id });

//     if (!profile) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!');
//     }

//     if (!profile.email) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!');
//     }

//     const passResetToken = await jwtHelpers.createResetToken({ id: user.id }, config.secret.secret as string, '50m');

//     const resetLink: string = config.resetlink + `token=${passResetToken}`;

//     console.log('profile: ', profile);
//     await sendEmail(
//         profile.email,
//         `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `
//     );

// return {
//   message: "Check your email!"
// }
// };

// const resetPassword = async (payload: { id: string; newPassword: string }, token: string) => {
//     const { id, newPassword } = payload;
//     const user = await User.findOne({ id }, { id: 1 });

//     if (!user) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
//     }

//     const isVarified = await jwtHelpers.verifyToken(token, config.jwt.secret as string);

//     const password = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds));

//     await User.updateOne({ id }, { password });
// };

export const AuthService = {
    loginUser,
    refreshToken
    // changePassword,
    // forgotPass,
    // resetPassword
};
