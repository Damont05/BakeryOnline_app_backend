import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const creaHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validPass = (user, password) => bcrypt.compareSync(password, user.password);

export const auth = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }
    next();
};

export const authAdmin = (req, res, next) => {
    if (!(req.session.user.rol === "admin")) {
        res.status(200).json({ message: "Only the admin has access" });
        return;
    }
    next();
};

export const authUser = (req, res, next) => {
    console.log("authUser: ",req.session.user);
    if (!(req.session.user.rol === "user")) {
        res.status(200).json({ message: "Only the users has access" });
        return;
    }
    next();
};

