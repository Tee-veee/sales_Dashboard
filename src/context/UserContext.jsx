import { createContext, useContext, useState } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import CreateModalContext from "./CreateModalContext";
import SidebarContext from "./SidebarContext";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userListShort, setUserListShort] = useState();
  const [userListLong, setUserListLong] = useState();
  const { setShowModal } = useContext(CreateModalContext);
  const { setSelected } = useContext(SidebarContext);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log(user);

    const currentUser = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      image: user.photoURL,
    };

    setUser(currentUser);

    const usersQuery = query(collection(db, "users"));
    const usersSnapshot = await getDocs(usersQuery);

    // // IF NO USERS CREATE USER
    if (usersSnapshot.docs.length === 0) {
      await setDoc(doc(db, "users", currentUser.uid), {
        name: currentUser.name,
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
        return users.push(userDoc.id);
      });

      // IF THE ARR INCLUDES THE CURRENT EMAIL VALUE, THEN THE USER ALREADY EXISTS && RETURN
      if (users.includes(checkUserUID)) {
        const docRef = doc(db, "users", checkUserUID);
        const docSnap = await getDoc(docRef);
        return setUser(docSnap.data());
      } else {
        // CREATE USER
        await setDoc(doc(db, "users", currentUser.uid), {
          name: currentUser.name,
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
    setSelected("Home");
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
    const { userSuburb, userPhone, userType, userPostcode, userAddress } =
      userData;

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      name: newName,
      email: newEmail,
      address: userAddress,
      suburb: userSuburb,
      postcode: userPostcode,
      phone: userPhone,
      type: userType,
    });

    getUsers(longList);
    setShowModal(false);
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
