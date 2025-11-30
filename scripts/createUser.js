import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import '../config/firebase.js';

async function createUser(username, password, role='admin') {
    const hash = await bcrypt.hash(password,10);

    const user = await UserModel.createUser({
        username,
        password: hash,
        role
    });

    console.log("Usuario creado:");
    console.log(user);
}

createUser('admin','123456','admin')
.then(()=> process.exit())
.catch(err => {
    console.error(err);
    process.exit(1);
});