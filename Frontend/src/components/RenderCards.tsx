import { Card, UserCard } from ".";

type Post = {
  _id: string,
  userName: string,
  prompt: string,
  photoUrl: string,
  photoId: string,
  tags: [string]
}

type Props = {
  data: Post[];
  title: string;
  profileView: boolean
};

function 
RenderCards({ data, title, profileView }: Props) {
  if(data?.length > 0) {
    return data.map((post: any) => 
      !profileView ?
      <Card key={post._id} _id={post._id} name={post.userName} prompt={post.prompt} imgUrl={post.photoUrl} /> :
      <UserCard key={post._id} _id={post._id} prompt={post.prompt} photo={post.photoUrl} tags={post.tags} />
    )
  }
  return <h2 className="font-bold capitalize text-lg">{title}...</h2>
}

export default RenderCards;
