import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaFacebook, FaReddit } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoCopyOutline } from "react-icons/io5";
import Toast from "./commons/toast";
import { useState } from "react";

const Modal = ({ username }) => {
  const [show, setShow] = useState(false);

  const showToast = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://linkpile-bffd7.web.app/${username}`);
    showToast();
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Toast show={show} message="Copid to clipboard" />
      <div className="relative p-4 flex flex-col w-full max-w-lg bg-white dark:bg-secondary border border-gray-300 dark:border-border-dark rounded-xl space-y-4">
        <h3 className="text-gray-800 dark:text-white text-3xl font-semibold">
          Share via
        </h3>
        <div className="flex justify-around items-center gap-2">
          <IoCopyOutline
            size={45}
            onClick={handleCopy}
            className="text-gray-700 dark:text-gray-50 cursor-pointer hover:scale-110"
          />
          <a
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Flinkpile-bffd7.web.app%2F${username}`}
            target="_blank"
            className="text-gray-700 dark:text-gray-50 cursor-pointer hover:scale-110"
          >
            <AiFillTwitterCircle size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://www.facebook.com/sharer.php?u=https://linkpile-bffd7.web.app/${username}`}
            target="_blank"
            className="text-gray-700 dark:text-gray-50 cursor-pointer hover:scale-110"
          >
            <FaFacebook size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flinkpile-bffd7.web.app%2F${username}`}
            target="_blank"
            className="text-gray-700 dark:text-gray-50 cursor-pointer hover:scale-110"
          >
            <AiFillLinkedin size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://www.reddit.com/submit?url=https%3A%2F%2Flinkpile-bffd7.web.app%2F${username}`}
            target="_blank"
            className="text-gray-700 dark:text-gray-50 cursor-pointer hover:scale-110"
          >
            <FaReddit size={45} />
          </a>
          <a
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?text=https://linkpile-bffd7.web.app/${username}`}
            target="_blank"
            className="text-gray-700 dark:text-gray-50 cursor-pointer hover:scale-110"
          >
            <AiOutlineWhatsApp size={45} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  username: PropTypes.string.isRequired,
};
