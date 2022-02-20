import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const currentUser = {
      username: user.displayName,
      email: user.email,
      uid: user.uid,
      image: user.photoURL,
    };

    setUser(currentUser);

    const usersQuery = query(collection(db, "users"));
    const usersSnapshot = await getDocs(usersQuery);

    // IF NO USERS CREATE USER
    if (usersSnapshot.docs.length === 0) {
      await setDoc(doc(db, "users", currentUser.email), {
        name: currentUser.username,
        email: currentUser.email,
        image: currentUser.image,
        uid: currentUser.uid,
      });
    } else if (usersSnapshot.docs.length > 0) {
      // IF THERE ARE USERS
      const usersQuery = query(collection(db, "users"));
      const usersSnapshot = await getDocs(usersQuery);

      const checkUserEmail = currentUser.email;
      const users = [];
      // MAPS ALL THE USER.EMAILS STORED IN FIREBASE INTO AN ARRAY
      usersSnapshot.docs.map((userDoc) => {
        return users.push(userDoc.email);
      });

      // IF THE ARR INCLUDES THE CURRENT EMAIL VALUE, THEN THE USER ALREADY EXISTS && RETURN
      if (users.includes(checkUserEmail)) {
        return;
      } else {
        // CREATE USER
        await setDoc(doc(db, "users", currentUser.email), {
          name: currentUser.username,
          email: currentUser.email,
          image: currentUser.image,
          uid: currentUser.uid,
        });
      }
    }
  };

  const signOutWithGoogle = async () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signInWithGoogle, signOutWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
