import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import GiftItem from "./giftItem";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip';
import { db } from "./firebase";
import { updateDoc, getDocs, deleteDoc, collection, addDoc, onSnapshot, query, where, Timestamp } from "firebase/firestore";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const style = {
  form: "flex items-center justify-between gap-2 p-2",
  input: "w-full rounded-md p-2",
  button: "bg-slate-300 p-2 rounded-md",
  list: "list-inside overflow-auto",
  itemNumber: "text-center text-xl", 
  title: "font-bold flex justify-center gap-2 p-3",
  owner: "underline font-container text-5xl text-center p-1",
  slothcredits: "text-xl p-1 text-blue-400",
  slothcoin: "w-10 h-10 mt-1 align-middle",
  container: "border-2 border-slate-300 rounded-md p-4 max-w-[1500px] w-full mx-auto",
  buttonHint: "align-top inline-block opacity-30 hover:opacity-100",
}


function Wishlist( props ) {

    const { user } = props;

    const [gifts, setGifts] = React.useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "gifts");
        const q = query(collectionRef, where("user", "==", user));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newGifts = snapshot.docs.map((doc) => doc.data());
          setGifts(newGifts);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
      

        
      const addGift = async (giftData) => {
        const collectionRef = collection(db, "gifts");
        console.log("Collection ref:", collectionRef);
        try {
          const docRef = await addDoc(collectionRef, {
            ...giftData
          });
          console.log("Gift added with ID:", docRef.id);
        } catch (error) {
          console.error("Error adding gift:", error);
        }
        
        document.querySelector(`[name="giftName${user}"]`).value = "";
        document.querySelector(`[name="giftStore${user}"]`).value = "";
        document.querySelector(`[name="giftPrice${user}"]`).value = "";
        document.querySelector(`[name="giftPresentation${user}"]`).value = "";
      };
    
    const handleAddGift = async (event) => {
        event.preventDefault(); // Prevent form submission

        const giftData = {
          name: document.querySelector(`[name="giftName${user}"]`).value.trim(),
          store: document.querySelector(`[name="giftStore${user}"]`).value.trim(),
          price: document.querySelector(`[name="giftPrice${user}"]`).value.trim(),
          presentation: document.querySelector(`[name="giftPresentation${user}"]`).value.trim(),
          createdAt: Timestamp.now(),
          user: user,
          completed: false
        };
      
        await addGift(giftData);
      };

      const deleteGift = async (name) => {
        console.log("gifttoDelete", name);
    
        const giftsCollectionRef = collection(db, "gifts");
        const q = query(giftsCollectionRef, where("name", "==", name));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
    
        setGifts((prevGifts) => prevGifts.filter((gift) => gift.name !== name));
      };

      const toggleCompleted = async (createdAt) => {
        console.log("giftToUpdate", createdAt);
        const giftsCollectionRef = collection(db, "gifts");
        const queryRef = query(giftsCollectionRef, where("createdAt", "==", createdAt));
        const querySnapshot = await getDocs(queryRef);
      
        if (!querySnapshot.empty) {
          const giftDoc = querySnapshot.docs[0];
          const giftToUpdate = giftDoc.data();
          const updatedGift = { ...giftToUpdate, completed: !giftToUpdate.completed };
          await updateDoc(giftDoc.ref, updatedGift);
          setGifts((prevGifts) =>
            prevGifts.map((gift) => (gift.createdAt === createdAt ? updatedGift : gift))
          );
        } else {
          console.log("No document found with the given createdAt");
        }
      };




    return(
        <div className={style.container}>
            <h2 className={style.owner}>{user}'s Wishlist</h2>
            <div className={style.title} >
            <p className={style.slothcredits}>You have {10 - gifts.length + gifts.filter((gift) => gift.completed).length } CrediSloths</p>
                <img src={require("../images/slothcoin.png")} className={style.slothcoin} alt="slothcoin" />
                <Tooltip title="You use these for requesting gifts, you'll get more by completing the other's tasks" arrow>
                    <button className={style.buttonHint}><AiOutlineQuestionCircle size={25} /></button>
                </Tooltip>

            </div>
            <form className={style.form}>
                <input type="text" name={`giftName${user}`} className={style.input} placeholder="What do you want to get?" />
                <input type="text" name={`giftStore${user}`} className={style.input} placeholder="Store?" />
                <input type="text" name={`giftPrice${user}`} className={style.input} placeholder="Price?" />
                <input type="text" name={`giftPresentation${user}`} className={style.input} placeholder="Presentation?" />
                <button className={style.button} onClick={handleAddGift}><AiOutlinePlus size={25} /></button>
            </form>
            <ul className={style.list}>
                {/*here we will populate with the items in the firestore*/}
                <TransitionGroup component={null}>
                  {gifts.map((gift, index) => (
                    <CSSTransition key={index} classNames="fade" timeout={300}>
                      <GiftItem
                        gift={gift}
                        deleteGift={deleteGift}
                        toggleCompleted={toggleCompleted}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
            </ul>
            <p className={style.itemNumber}>There are {gifts.length} items</p>
        </div>
    );
}

export default Wishlist;