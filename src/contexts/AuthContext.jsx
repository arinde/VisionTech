
import { useContext, createContext, useRef, useState, useEffect  } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            

            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef)

                if (docSnap.exists) {
                    setUserData(docSnap.data());
                }
                else {
                console.warn("No user profile found in Firestore");
                setUserData(null);
                }
            } else {
                setUserData(null);
            }

            setLoading(false)
        });

        return() => unsuscribe;
    }, [])

    const logout = async () =>{
        try {
            await signOut(auth);

        } catch (err) {
            console.error("logout error", user)
        }
    };

    const value ={
        currentUser,
        userData,
        logout,
    }

    return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="text-center p-4">Loading...</div> : children}
    </AuthContext.Provider>
  );
}