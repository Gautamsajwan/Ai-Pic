import { Card } from ".";

type Post = {
  _id: string,
  name: string,
  prompt: string,
  photo: string
}

type Props = {
  data: Post[];
  title: string;
};

function RenderCards({ data, title }: Props) {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return <h2>{title}</h2>
}

export default RenderCards;
