import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}
const TopSellers = () => {
  const [authors, setAuthor] = useState<Author[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const authorsData: Author[] = data.results.map((author: any) => ({
          name: `${author.name.first} ${author.name.last}`,
          isFollowing: false,
          image: author.picture.medium,
        }));
        setAuthor(authorsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleFollowClick = (index: number) => {
    setAuthor((prev) =>
      prev.map((author, i) =>
        index === i ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };
  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>
      <ul>
        {authors.map((author, index) => {
          return (
            <li key={index} className="flex items-center justify-between mb-4">
              <section className="flex justify-center items-center">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-1/4 h-1/4 justify-center rounded-full"
                />
                <span className="ml-4">{author.name}</span>
              </section>
              <button
                className={`py-1 px-3 rounded text-white ${
                  author.isFollowing ? "bg-red-500" : " bg-black"
                }`}
                onClick={() => handleFollowClick(index)}
              >
                {author.isFollowing ? "Unfollow" : "Follow"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopSellers;
