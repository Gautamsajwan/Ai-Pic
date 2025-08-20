import { useState } from "react";
import { CgOptions } from "react-icons/cg";
import { downloadImage } from "../utils";
import { toast } from "react-toastify";
import { CgHashtag } from "react-icons/cg";
import { TbClipboardText } from "react-icons/tb";
import { Model } from "../components";
import LoadingBar from 'react-top-loading-bar';

type Props = {
  _id: string;
  prompt: string;
  photo: string;
  tags: string[];
};

function UserCard({ _id, photo, prompt, tags }: Props) {
  const [viewOptions, setViewOptions] = useState<boolean>(false);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [model, setModel] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)

  const tagsArray = tags.slice(0, 6).map(tag => (
    <span className="text-sm bg-gray-700/40 p-2 rounded-md">{tag}</span>
  ))

  const closeModels = () => {
    setViewOptions(false);
    setViewDetails(false);
  };

  const handleShowOptions = () => {
    setViewOptions((prev) => !prev)
    // setViewDetails(false);
  }

  const handleViewDetails = () => {
    setViewDetails((prev) => !prev);
    setViewOptions(false);
  };

  const hideModel = () => {
    setModel(false)
    setViewOptions(false)
  }

  const handleDeleteImage = async() => {
    try {
      setProgress(40)
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post/deletePost/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const result = await response.json()

      if(result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
      setProgress(100)
    } catch (error:any) {
      toast.error(`Internal server error: ${error.message}`)
    }
  }

  const handleDownload = () => {
    downloadImage(_id, photo);
    toast.info("Image downloaded successfully");
  };
  
  return (
    <div className="p-2 group relative rounded-[20px] border-2 border-gray-400 border-dashed overflow-hidden group">
      {model && <Model handleYes={handleDeleteImage} handleNo={hideModel} />}
      <LoadingBar
        color='#6469ff'
        progress={progress}
        transitionTime={500}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      
      <img
        onClick={closeModels}
        className="object-cover w-full h-full aspect-square rounded-xl group-hover:scale-110 transition-transform duration-200 ease-in-out"
        src={photo}
        alt="ai images"
      />

      <button
        onClick={handleShowOptions}
        className="absolute p-1 top-4 right-4 rounded-md bg-[#10131f]/60 backdrop-blur-sm"
      >
        <CgOptions className="w-7 h-7 text-white" />
      </button>

      {viewOptions && (
        <div className="font-semibold absolute backdrop-blur-sm bg-[#10131f]/70 outline outline-[2.5px] outline-gray-300/60 rounded-md top-12 right-2 text-white z-10">
          <div className="px-1.5 py-2 flex flex-col">
            <button
              onClick={handleViewDetails}
              className="text-left pl-2 pr-3 pb-1 border-b-[2px] border-gray-300/60 hover:text-blue-400">
              Details
            </button>
            <button
              onClick={handleDownload}
              className="text-left pl-2 pr-3 py-1 border-b-[2px] border-gray-300/60 hover:text-green-500">
              Download
            </button>
            <button
              onClick={() => setModel(true)}
              className="text-left pl-2 pr-3 pt-1 hover:text-red-500">
              Delete
            </button>
          </div>
        </div>
      )}

      {viewDetails && (
        <div className="flex flex-col gap-2 max-h-[70%] overflow-y-auto prompt absolute bottom-0 left-0 right-0 rounded-lg bg-[#10131f]/70 backdrop-blur-sm m-2 p-3 transition-all ease-in-out duration-300">
          <div className="text-white text-sm font-[500]">
            <TbClipboardText className="w-6 h-6 text-orange-400 -translate-x-0.5 mb-1" />
            <p className="max-h-[150px] overflow-auto prompt">{prompt}</p>
          </div>
          <div>
            <CgHashtag className="w-6 h-6 text-blue-400 -translate-x-0.5 mb-1"/>
            <div className="flex flex-wrap gap-2 text-white">
              {tagsArray}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
