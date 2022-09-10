import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config();
const { SECRET_HASH } = process.env;

const encode = (arg) => {
    const encode = crypto.createHmac('sha256', SECRET_HASH);
    const hash = encode.update(arg).digest("hex");

    return hash
}

export default encode;