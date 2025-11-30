import { db } from '../config/firebase.js';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    getDoc,
    doc
} from 'firebase/firestore';

const collectionName = 'usuarios';

export const UserModel = {
    async findByUsername(username){
        const ref = collection(db, collectionName);
        const q = query(ref, where('username', '==', username));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;

        const docData = snapshot.docs[0];
        return  { id: docData.id, ...docData.data() };
    },

    async createUser(data){
        const ref = collection(db,collectionName);
        const docRef = await addDoc(ref, data);
        const snapshot = await getDoc(docRef);
        return { id: snapshot.id, ...snapshot.data() };
    }
};