import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    setDoc,
    deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Obtiene el usuario actual
export async function userExists(uid) {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    return res.exists();
}

// Verifica si el usuario esta logueado
export async function existsUsername(username) {
    const users = [];
    const docsRefs = collection(db, "users");
    const q = query(docsRefs, where("username", "==", username));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        users.push(doc.data());
    });

    return users.length > 0 ? users[0].uid : null;
}

// Registra un usuario en la base de datos
export async function registerNewUser(user) {
    try {
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);

    } catch (error) {
        console.log(error);
    }
}

// Actualizar datos del usuario
export async function updateUser(user) {
    try {
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }
}

// Obtiene información de un usuario
export async function getUserInfo(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const document = await getDoc(docRef);
        return document.data();
    } catch (error) {
        console.log(error);
    }
}

// Inserta un nuevo link
export async function insertNewLink(link) {
    try {
        const docRef = collection(db, "links");
        const res = await addDoc(docRef, link);
        return res;
    } catch (error) {
        console.error(error);
    }
}

// Obtiene todos los links de la base de datos
export async function getLinks(uid) {
    const links = [];
    try {
        const collectionRef = collection(db, "links");
        const q = query(collectionRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            const link = {
                ...doc.data()
            };
            link.docId = doc.id;
            links.push(link);
        })
        return links;
    } catch (error) {

    }
}

// Actualiza un link de la base de datos
export async function updateLink(docId, link) {
    try {
        const docRef = doc(db, "links", docId);
        const res = await setDoc(docRef, link);
        return res;
    } catch (error) {
        console.error(error);
    }
}

// Elimina un link de la base de datos
export async function deleteLink(docId) {
    try {
        const docRef = doc(db, "links", docId);
        const res = await deleteDoc(docRef, docId);
        return res;
    } catch (error) {
        console.error(error);
    }
}

// Enviar foto a la base de datos
export async function setUserProfilePhoto(uid, file) {
    try {
        const imageRef = ref(storage, `images/${uid}`)
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload;
    } catch (error) {
        console.error(error);
    }
}

// Recibir foto de la base de datos
export async function getProfilePhotoUrl(profilePicture) {
    try {
        const imageRef = ref(storage, profilePicture);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.error(error);
    }
}

// Obtener links y usuario de la base de datos
export async function getUserPublicProfileInfo(uid) {
    const profileInfo = await getUserInfo(uid);
    const linksInfo = await getLinks(uid);
    return {
        profileInfo: profileInfo,
        linksInfo: linksInfo,
    }
}

export async function logout(){
    await auth.signOut();
}