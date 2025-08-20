import { useEffect, useState } from "react";
import { Loader, FormField, RenderCards } from "../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {};

type Post = {
  _id: string,
  userName: string,
  prompt: string,
  photoUrl: string,
  photoId: string,
  tags: [string]
}

function Home({}: Props) {
  const navigate = useNavigate()
  const [loading, setloading] = useState<boolean>(false);
  const [allPosts, setallPosts] = useState<Post[]>([]);
  const [searchText, setsearchText] = useState<string>('');
  const [searchTimeoutID, setSearchTimeoutID] = useState<number | null>(null);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  useEffect(() => {
    const getAllPosts = async() => {
      try {
        setloading(true)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post/allPosts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        
        const result = await response.json()
        console.log(result)
        
        if(response.status === 401) {
          navigate('/login')
          toast.error(result.message)
          return
        }
        if(response.status === 500) {
          toast.error(result.message)
          return
        }
        
        // let tempArr: Post[] = []
        // for(let i=0; i<result.data.length; i++) {
        //   tempArr.push(result.data[i])
        // }
        // setallPosts(tempArr)
        setallPosts(result.data.reverse())
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setloading(false)
      }
    }

    getAllPosts()
  },[])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(searchTimeoutID) {
      clearTimeout(searchTimeoutID);
    }

    setsearchText(e.target.value);

    setSearchTimeoutID(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.userName.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
        console.log(searchResult)
      }, 500)
    );
  }

  return (
    <section className="min-h-[80vh] font-montserrat max-w-7xl mx-auto px-4 py-3">
      <div>
        <h1 className="font-bold drop-shadow-lg font-spacemono text-4xl md:text-5xl mt-5 mb-2">The Community ShowCase</h1>
        <p className="mt-1 text-[#666e75] text-sm font-medium max-w-[700px] bg-gray-200 rounded-md px-3 py-1">
          Browse through a collection of imaginative and visually stunning images
        </p>
      </div>

      <div className="mt-14">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span>{searchText}</span>
              </h2>
            )}
            <div className="mb-5 px-3 py-3 bg-[rgb(236,236,238)] rounded-2xl grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 max-h-screen overflow-auto exceeding-dark">
              {searchText ? (
                <RenderCards profileView={false} data={searchedResults} title="no search results found" />
              ) : (
                <RenderCards profileView={false} data={allPosts} title="no posts yet" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
