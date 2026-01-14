interface CategoryCardProps {
  image: string;
  title: string;
  count: number;
}

const CategoryCard = ({ image, title, count }: CategoryCardProps) => {
  return (
    <a href="#" className="group block">
      <div className="image-zoom rounded-sm overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span className="text-xs text-muted-foreground mt-1 inline-block">
          {count}
        </span>
      </div>
    </a>
  );
};

export default CategoryCard;
