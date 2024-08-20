import { Link } from "react-router-dom";
interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}
const BookCard = ({ id, title, image, price }: BookCardProps) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt="product image"
          className="w-full h-32 object-cover mb-2"
        />
        <h2 className="font-bold">{title}</h2>
        <p>${price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
