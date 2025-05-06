// const Staff = require('../models/Staff');
// const { doHash, doHashValidation, } = require('../utils/hashing');

// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingUser = await Staff.findOne({ email });

//         if (existingUser) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'User already exists!',
//             });
//         }

//         const hashPassword = await doHash(password, 12);

//         const newUser = new Staff({
//             name,          
//             email,
//             password: hashPassword,
//         });

//         const result = await newUser.save();
//         result.password = undefined; 

//         res.status(201).json({
//             success: true,
//             message: 'Your account has been created successfully',
//             result,
//         });

//     } catch (error) {
//         console.error('Signup error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error during signup',
//         });
//     }
// };



// exports.signin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingUser = await Staff.findOne({ email });

//         if (!existingUser) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'User not found',
//             });
//         }

//         const result = await doHashValidation(password, existingUser.password); 
        
//         if (!result == password) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'invalid credentials'
//             });
//         }


        
//         return res.status(200).json({
//             success: true,
//             message: 'Login success',
//         });
        
       

//     } catch (error) {
//         console.log(error);
        
//     }
// };


// exports.profile = async (req, res) => {
//     const { email } = req.query;
//     if(!email){
//         return res.status(404).json({
//             message: "Enter email",
//         });

//     }
//     try {
//         const user = await Staff.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             user 
//        });

//     } catch (error) {
//         console.error("Error fetching profile:", error.message);
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };

const Staff = require('../models/Staff');
const { doHash, doHashValidation } = require('../utils/hashing');

// Signup controller
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await Staff.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User already exists!',
            });
        }

        const hashedPassword = await doHash(password, 12);

        const newUser = new Staff({
            name,
            email,
            password: hashedPassword,
        });

        const result = await newUser.save();
        result.password = undefined; // Remove password from response

        return res.status(201).json({
            success: true,
            message: 'Your account has been created successfully',
            user: result,
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during signup',
        });
    }
};

// Signin controller
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Staff.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = await doHashValidation(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
        });

    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during signin',
        });
    }
};

// Profile controller
exports.profile = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email query is required",
        });
    }

    try {
        const user = await Staff.findOne({ email }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Profile fetch error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error fetching profile",
        });
    }
};
