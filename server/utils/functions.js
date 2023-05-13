import bcrypt from "bcrypt";

export function requestLogger(req, res, next) { //Funcion utilizada para obtener las rutas ingresadas por un cliente o empleado
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}


export async function hashPassword(password) { //Funcion para encriptar contraseña
    let saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}