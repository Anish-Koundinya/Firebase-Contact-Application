import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" absolute top-0 backdrop-blur h-screen w-screen z-40 grid place-items-center">
          <div className="relative m-auto z-50 min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                className="text-2xl cursor-pointer"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
