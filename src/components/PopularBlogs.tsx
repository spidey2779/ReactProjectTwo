import { MessageCircle, ThumbsUp } from "lucide-react";

const blogs = [
    {
      title: "Exploring the Universe",
      author: "Neil Armstrong",
      like: 215,
      comments: 57,
    },
    {
      title: "The Art of Cooking",
      author: "Gordon Ramsay",
      like: 350,
      comments: 120,
    },
    {
      title: "Tech Trends 2024",
      author: "Elon Musk",
      like: 478,
      comments: 201,
    },
    {
      title: "Mindfulness and Meditation",
      author: "Dalai Lama",
      like: 290,
      comments: 86,
    },
    {
      title: "Sustainable Living",
      author: "Greta Thunberg",
      like: 410,
      comments: 150,
    },
  ];
  
const PopularBlogs = () => {
  return (
    <div className="bg-white p-5 w-[23rem] mt-4 ml-5 rounded border max-h-[30rem] overflow-y-scroll">
      <h2 className="text-xl font-bold ml-5 mb-3">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-4 ml-5">
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2 capitalize">{blog.title}</span>
            </div>
            <span className="text-gray-600">{blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} />
              <span className="text-gray-500 mr-5 ml-1">{blog.like}</span>
              <ThumbsUp size={16} />
              <span className="text-gray-500 mr-2 ml-2">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
