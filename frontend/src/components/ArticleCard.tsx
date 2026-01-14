import { Link } from "react-router-dom";

interface ArticleCardProps {
  slug: string;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  featured?: boolean;
}

const ArticleCard = ({ slug, image, category, title, author, date, featured = false }: ArticleCardProps) => {
  const href =  slug? `/blog/${slug}` : "#";
  
  return (
    <article className={`group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <Link to={href} className="block">
        <div className="image-zoom rounded-sm overflow-hidden mb-4">
          <img
            src={image}
            alt={title}
            className={`w-full object-cover ${featured ? 'aspect-[4/3] md:aspect-[3/2]' : 'aspect-[4/3]'}`}
          />
        </div>
        <div>
          <span className="category-label">{category}</span>
          <h3 className={`article-title group-hover:text-primary transition-colors mt-2 mb-3 ${
            featured ? 'text-xl md:text-2xl lg:text-3xl' : 'text-lg md:text-xl'
          }`}>
            {title}
          </h3>
          <p className="article-meta">
            By {author} / {date}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
