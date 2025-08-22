import { useEffect, useState } from "react";
import { BiHome, BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type Props = {};

type Post = {
  _id: string;
  userName: string;
  prompt: string;
  photoUrl: string;
  photoId: string;
  tags: [string];
};

function PersonalProfile({}: Props) {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const nav = useNavigate()

  

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/post/getUserPosts`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              username: "Gautam",
            }),
            credentials: "include",
          }
        );

        const result = await response.json();
        console.log(result)
        setUserPosts(result.postArray);
      } catch (err) {
        console.log(err);
      }
    };

    getUserPosts();
  }, []);

  return (
    <section className="font-montserrat min-h-screen relative sm:flex">
      {/* sidebar with navigation to home and create post */}
      <div onClick={() => nav('/')} className="w-full md:w-[20%] lg:w-[15%] h-fit md:h-screen bg-[#F2FAFF] fixed md:sticky bottom-0 md:top-0 md:left-0 flex flex-row md:flex-col gap-2 p-2 md:p-3 border-t-4 md:border-t-0 md:border-r-4 border-gray-300 z-20">
        <button className="py-2 sm:py-[10px] px-2 sm:px-3 rounded-lg w-full flex justify-center items-center gap-2 text-base sm:text-lg font-bold hover:bg-[#bbbec7] active:scale-95 transition-color duration-300 ease-in-out">
          Home
          <BiHome className="w-7 h-7 -translate-y-[2.5px]" />
        </button>

        <span className="w-2 bg-gray-300"></span>

        <button onClick={() => nav('/create-post')} className="py-2 sm:py-[10px] px-2 sm:px-3 rounded-lg w-full flex justify-center items-center gap-2 text-base sm:text-lg font-bold hover:bg-[#bbbec7] active:scale-95 transition-color duration-300 ease-in-out">
          Create
          <BiImageAdd className="w-7 h-7" />
        </button>
      </div>
      {/* rest of the section showing profile info and posts*/}
      <div className="pb-[60px] flex flex-col gap-2 overflow-auto w-full md:w-[80%] lg:w-[85%]">
        {/* Work on the commented section to profile related info such as user posts */}
        {/* <div className="ml-4 mt-4 w-fit flex items-center gap-2 bg-gray-300 px-4 py-3 rounded-full">
          <FiGrid className="w-7 h-7"/>
          <h2 className="text-xl font-semibold">All posts</h2>
        </div>
        <div className="px-4 pt-2 pb-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto exceeding-dark">
          <RenderCards
            profileView={true}
            data={userPosts}
            title="you haven't posted yet"
          />
        </div> */}

        <h1 className="p-4 font-semibold text-lg">This feature will release soon...</h1>
      </div>
    </section>
  );
}

export default PersonalProfile;
