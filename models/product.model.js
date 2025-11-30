import { db } from "../config/firebase.js";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

const collectionName    = 'productos';

export const ProductModel = {
    async getAll() {
        const ref   = collection(db,collectionName);
        const snapshot  = await getDocs(ref);
        return snapshot.docs.map(d => ({ id: d.id,...d.data() }));
    },

    async getById(id){
        const ref   = doc(db,collectionName,id);
        const snapshot = await getDoc(ref);
        
        if (!snapshot.exists()) {
            return null;
        }

        return  { id: snapshot.id, ...snapshot.data() };
    },

    async create(data) {
        const ref = collection(db, collectionName);
        const docRef = await addDoc(ref, data);
        const created = await getDoc(docRef);
        return { id: created.id, ...created.data() };
    },

    async update(id, data){
        const ref = doc(db, collectionName, id);
        await updateDoc(ref, data);
        const updated = await getDoc(ref);
        return { id:updated.id, ...updated.data() };
    },

    async remove(id){
        const ref = doc(db, collectionName, id);
        await deleteDoc(ref);
        return true;
    }
};