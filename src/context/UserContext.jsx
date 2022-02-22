import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userListShort, setUserListShort] = useState();
  const [userListLong, setUserListLong] = useState();

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
      await setDoc(doc(db, "users", currentUser.uid), {
        name: currentUser.username,
        email: currentUser.email,
        image: currentUser.image,
        uid: currentUser.uid,
      });
    } else if (usersSnapshot.docs.length > 0) {
      // IF THERE ARE USERS
      const usersQuery = query(collection(db, "users"));
      const usersSnapshot = await getDocs(usersQuery);

      const checkUserUID = currentUser.uid;
      const users = [];
      // MAPS ALL THE USER.EMAILS STORED IN FIREBASE INTO AN ARRAY
      usersSnapshot.docs.map((userDoc) => {
        return users.push(userDoc.uid);
      });

      // IF THE ARR INCLUDES THE CURRENT EMAIL VALUE, THEN THE USER ALREADY EXISTS && RETURN
      if (users.includes(checkUserUID)) {
        return;
      } else {
        // CREATE USER
        await setDoc(doc(db, "users", currentUser.uid), {
          name: currentUser.username,
          email: currentUser.email,
          image: currentUser.image,
          uid: currentUser.uid,
        });
      }
    }
    getUsers(true, false);
  };

  const signOutWithGoogle = async () => {
    signOut(auth);
    setUser(null);
  };

  const getUsers = async (shortList, longList) => {
    const usersListRef = collection(db, "users");
    const docSnap = await getDocs(usersListRef);

    const testArr = [];

    if (shortList === true) {
      docSnap.forEach((doc) => {
        const { name, email } = doc.data();

        const userObj = {
          name,
          email,
        };

        testArr.push(userObj);
      });

      return setUserListShort(testArr);
    }

    if (longList === true) {
      docSnap.forEach((doc) => {
        const { name, email, phone, postcode, suburb, type } = doc.data();

        const userObj = {
          name,
          email,
          phone,
          postcode,
          suburb,
          type,
        };

        testArr.push(userObj);
      });

      return setUserListLong(testArr);
    }
  };

  const updateUser = async (newEmail, newName, userData, longList) => {
    const { userSuburb, userPhone, userType, userPostcode } = userData;

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      name: newName,
      email: newEmail,
      suburb: userSuburb,
      postcode: userPostcode,
      phone: userPhone,
      type: userType,
    });

    getUsers(longList);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOutWithGoogle,
        userListShort,
        setUserListShort,
        getUsers,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
