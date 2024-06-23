import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  Name: Yup.string().required("Name is Required"),
  Email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContacts = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (values) => {
    try {
      const contactRef = collection(db, "contacts2");
      await addDoc(contactRef, values);
      toast.success("Contact Added Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (values, id) => {
    try {
      const contactRef = doc(db, "contacts2", id);
      await updateDoc(contactRef, values);
      toast.success("Contact Updated Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? { Name: contact.Name, Email: contact.Email }
            : { Name: "", Email: "" }
        }
        onSubmit={(values) =>
          isUpdate ? updateContact(values, contact.id) : addContact(values)
        }
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="Name">Name</label>
            <Field name="Name" className="h-10 border" />
            <div className=" text-xs text-red-500">
              <ErrorMessage name="Name" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Email">Email</label>
            <Field name="Email" className="h-10 border" />
            <div className=" text-xs text-red-500">
              <ErrorMessage name="Email" />
            </div>
          </div>
          <button className="bg-orange border px-3 py-1.5 rounded-md cursor-pointer self-end">
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContacts;
