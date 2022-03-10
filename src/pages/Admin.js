import { useEffect, useState } from "react";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/firestoreContext";
import { useHeader } from "../context/headerContext";
import { useAdmin } from "../context/adminContext";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Share from "../components/share";
import Editor from "../components/Editor";
import Appearance from "../components/appearance";
import Preview from "../components/Preview";
import {
  HiOutlineLink,
  HiOutlinePencil,
  HiOutlineUpload,
} from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";
import { BsBrush } from "react-icons/bs";

export default function Admin() {
  const { logOut } = useAuth();
  const { userData, updateProfile } = useFirestore();
  const { setCustomHeader } = useHeader();
  const { state, dispatch } = useAdmin();
  const { username, profileName, about, links, appearance, socials, loading } =
    state;

  const [preview, setPreview] = useState(false);
  const [showDesign, setShowDesign] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: "update" });

    try {
      await updateProfile(userData.userId, {
        page: {
          ...userData.page,
          profileName: profileName,
          about: about,
          links: links,
          appearance: appearance,
          socials: socials,
        },
      });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error", error: error.message });
    }
  };

  useEffect(() => {
    const customHeader = (
      <Link
        to={`${ROUTES.PROFILE}`}
        className="px-4 py-2 text-white font-nunito font-bold rounded-3xl bg-primary-accent hover:bg-secondary-accent"
      >
        My Account
      </Link>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  return (
    <>
      {!preview && <Header />}
      <div className="lg:hidden">
        <Share username={username} />
      </div>

      <div
        className={`w-full grid ${
          !preview && "lg:grid-cols-2"
        } bg-gray-200 dark:bg-primary font-nunito`}
      >
        <div className={`w-full p-4  pb-96 ${preview && "hidden"}`}>
          <div className="hidden lg:flex">
            <Share username={username} />
          </div>
          {showDesign ? <Appearance /> : <Editor />}
        </div>

        <div
          className={`${
            preview ? "flex" : "hidden"
          } justify-center items-center lg:flex`}
        >
          <Preview preview={preview} />

          <div
            className={`relative ${
              preview ? "flex" : "hidden"
            } justify-center items-center lg:flex`}
          >
            {preview ? (
              <div
                onClick={() => setPreview(false)}
                className="fixed left-4 top-4 p-4 hidden lg:flex justify-center items-center space-x-1 bg-white dark:bg-secondary border border-gray-300 dark:border-border-dark rounded-3xl  cursor-pointer hover:bg-gray-300 dark:hover:bg-secondary-accent"
              >
                <HiOutlinePencil
                  size={23}
                  className="text-gray-800 dark:text-gray-400"
                />
                <span className="text-2xl text-gray-800 dark:text-white font-nunito">
                  Editor
                </span>
              </div>
            ) : (
              <div className="fixed top-24 p-4 hidden lg:flex items-center space-x-1 bg-white dark:bg-secondary rounded-3xl border border-gray-300 dark:border-border-dark cursor-pointe">
                {showDesign ? (
                  <div
                    onClick={() => setShowDesign(false)}
                    className="flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-border-dark rounded-xl"
                  >
                    <HiOutlineLink
                      size={25}
                      className="text-gray-800 dark:text-gray-400"
                    />
                    <span className="text-lg text-gray-800 dark:text-white font-nunito">
                      Links
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowDesign(true)}
                    className="flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-border-dark rounded-xl"
                  >
                    <BsBrush
                      size={25}
                      className="text-gray-800 dark:text-gray-400"
                    />
                    <span className="text-lg text-gray-800 dark:text-white font-nunito">
                      Design
                    </span>
                  </div>
                )}
                <div
                  onClick={() => setPreview(true)}
                  className="flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-border-dark rounded-xl"
                >
                  <AiOutlineEye
                    size={25}
                    className="text-gray-800 dark:text-gray-400"
                  />
                  <span className="text-lg text-gray-800 dark:text-white font-nunito">
                    Preview
                  </span>
                </div>
                <div
                  disabled={loading}
                  onClick={handleUpdate}
                  className="flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-border-dark rounded-xl"
                >
                  {loading ? (
                    <ImSpinner
                      size={25}
                      className="text-gray-800 dark:text-gray-400 animate-spin"
                    />
                  ) : (
                    <HiOutlineUpload
                      size={25}
                      className="text-gray-800 dark:text-gray-400"
                    />
                  )}
                  <span className="text-lg text-gray-800 dark:text-white font-nunito">
                    {loading ? "Saving" : "Save"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed z-50 bottom-0 w-full p-4 bg-white dark:bg-secondary flex justify-around items-center border border-border-dark rounded-t-3xl lg:hidden">
        {preview ? (
          <div
            onClick={() => setPreview(false)}
            className="flex justify-center items-center space-x-1  cursor-pointer"
          >
            <HiOutlinePencil
              size={45}
              className="text-gray-800 dark:text-gray-50"
            />
            <span className="text-2xl text-gray-800 dark:text-white font-nunito">
              Editor
            </span>
          </div>
        ) : (
          <>
            {showDesign ? (
              <div
                onClick={() => setShowDesign(false)}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <HiOutlineLink
                  size={45}
                  className="text-gray-800 dark:text-gray-50"
                />
                <span className="text-lg text-gray-800 dark:text-gray-50 font-nunito">
                  Links
                </span>
              </div>
            ) : (
              <div
                onClick={() => setShowDesign(true)}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <BsBrush
                  size={45}
                  className="text-gray-800 dark:text-gray-50"
                />
                <span className="text-lg text-gray-800 dark:text-gray-50 font-nunito">
                  Design
                </span>
              </div>
            )}
            <div
              onClick={() => setPreview(true)}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <AiOutlineEye
                size={45}
                className="text-gray-800 dark:text-gray-50"
              />
              <span className="text-lg text-gray-800 dark:text-gray-50 font-nunito">
                Preview
              </span>
            </div>
            <div
              disabled={loading}
              onClick={handleUpdate}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              {loading ? (
                <ImSpinner size={45} className="animate-spin" />
              ) : (
                <HiOutlineUpload
                  size={45}
                  className="text-gray-800 dark:text-gray-50"
                />
              )}
              <span className="text-lg text-gray-800 dark:text-gray-50 font-nunito">
                {loading ? "Saving" : "Save"}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
