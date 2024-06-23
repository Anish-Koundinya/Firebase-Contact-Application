import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import AddAndUpdateContacts from "./components/AddAndUpdateContacts";
import ContactCard from "./components/ContactCard";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts2");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          console.log(contactLists);
          setContacts(contactLists);
          //return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts2");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.Name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
      //return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative flex-grow items-center">
            <FiSearch className="text-white ml-1 text-3xl absolute" />
            <input
              type="text"
              className="h-10 border border-white bg-transparent rounded-md flex-grow text-white pl-9"
              onChange={filterContacts}
            />
          </div>

          <AiFillPlusCircle
            className="text-white text-5xl cursor-pointer"
            onClick={onOpen}
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContacts isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
