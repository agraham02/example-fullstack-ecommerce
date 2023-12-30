const User = require("./models/User");
const LocalStategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

async function comparePasswords(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(error);
    }
    return false;
}

function initializePassport(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const account = await User.findOne({ email: email });
            if (!account) {
                console.log("user not found");
                return done(null, false, { message: "user not found" });
            }

            if (await comparePasswords(password, account.password)) {
                console.log("authentication successful");
                return done(null, account);
            } else {
                console.log("passowrd is incorrect");
                return done(null, false, { message: "password is incorrect" });
            }
        } catch (error) {
            return done(error);
        }
    };
    passport.use(
        new LocalStategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((account, done) => {
        done(null, account.id);
    });
    passport.deserializeUser((id, done) => {
        try {
            console.log("I ran");
            const account = User.findById(id);
            done(null, account);
        } catch (error) {
            return done(error);
        }
    });
}

module.exports = initializePassport;
