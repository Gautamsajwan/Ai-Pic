import { useEffect, useState } from "react";
import { Loader, FormField, RenderCards } from "../components";
import { toast } from "react-toastify";

type Props = {};

type Post = {
  _id: string,
  name: string,
  prompt: string,
  photo: string
}

function Home({}: Props) {
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
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        
        const result = await response.json()
        
        if(!result.success) {
          return toast.error(result.msg)
        }
  
        setallPosts(result.data.reverse())
        console.log(result.data)
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
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  return (
    <section className="font-montserrat max-w-7xl mx-auto px-4 py-3">
      <div>
        <h1 className="font-extrabold text-[36px]">The Community ShowCase</h1>
        <p className="mt-1 text-[#666e75] text-sm font-medium max-w-[700px] bg-gray-200 rounded-full px-3 py-1">
          Browse through a collection of imaginative and visually stunning images
        </p>
      </div>

      <div className="mt-16">
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
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="no search results found" />
              ) : (
                <RenderCards data={allPosts} title="no posts yet" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
