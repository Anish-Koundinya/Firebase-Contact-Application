import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContacts from "./AddAndUpdateContacts";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts2", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between items-center p-2 rounded-lg "
      >
        <div className="flex gap-2">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div className="">
            <h2 className="font-medium">{contact.Name}</h2>
            <p className="text-sm">{contact.Email} </p>
          </div>
        </div>

        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            className="text-orange cursor-pointer"
            onClick={() => deleteContact(contact.id)}
          />
        </div>
      </div>
      <AddAndUpdateContacts
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
