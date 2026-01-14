import travelImg from "@/assets/article-travel.jpg";
import nutritionImg from "@/assets/article-nutrition.jpg";
import fashionImg from "@/assets/article-fashion.jpg";
import interiorImg from "@/assets/article-interior.jpg";
import lifestyleImg from "@/assets/article-lifestyle.jpg";
import heroImg from "@/assets/hero-image.jpg";
import featuredImg from "@/assets/featured-post.jpg";

export interface Article {
  id: string;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: "every-strike-brings-me-closer",
    image: heroImg,
    category: "Lifestyle",
    title: "Every strike brings me closer to the next",
    author: "Nathan",
    date: "02 May 2024",
    excerpt: "Discovering the power of persistence and how each setback becomes a stepping stone toward success.",
    readTime: "5 min read",
    content: `
      <p>Life has a funny way of teaching us lessons. Every setback, every failure, every moment of doubt is actually bringing us closer to where we need to be. This is the philosophy I've come to embrace after years of chasing dreams and falling short.</p>
      
      <h2>The Power of Persistence</h2>
      <p>When I first started my journey, I was naive enough to think success would come quickly. I was wrong. What I discovered instead was that every rejection, every closed door, was actually redirecting me toward something better.</p>
      
      <p>The key is to keep moving forward, even when the path seems unclear. Each step, no matter how small, is progress. Each failure is a lesson learned. Each strike brings you closer to the next home run.</p>
      
      <h2>Embracing the Journey</h2>
      <p>We often focus so much on the destination that we forget to appreciate the journey. But it's in the struggle that we find our strength. It's in the challenges that we discover who we really are.</p>
      
      <p>I've learned to embrace the hard times because I know they're shaping me into a better version of myself. The difficulties are not obstacles—they're opportunities in disguise.</p>
      
      <h2>Moving Forward</h2>
      <p>So the next time you face a setback, remember: you're not moving backward, you're gathering momentum. Every strike brings you closer to the next breakthrough. Keep swinging.</p>
    `
  },
  {
    id: "life-is-a-flower",
    image: featuredImg,
    category: "Wellness",
    title: "Life is a flower of which love is the honey",
    author: "Sarah",
    date: "28 Apr 2024",
    excerpt: "Exploring the sweet essence of life through love, connection, and mindful living.",
    readTime: "4 min read",
    content: `
      <p>There's a beautiful metaphor that life is like a flower, and love is the honey that makes it sweet. This simple analogy holds profound wisdom about how we should approach our daily existence.</p>
      
      <h2>The Nectar of Connection</h2>
      <p>Just as bees are drawn to flowers to collect their sweet nectar, we are drawn to each other through love. It's this connection that gives our lives meaning and purpose.</p>
      
      <p>Love comes in many forms—romantic love, the love of family, friendships, and even the love we have for our passions and pursuits. Each type of love adds its own unique sweetness to our lives.</p>
      
      <h2>Cultivating Your Garden</h2>
      <p>To experience the honey of life, we must first cultivate our garden. This means nurturing relationships, being present for others, and opening ourselves up to love in all its forms.</p>
      
      <p>It also means taking care of ourselves. Self-love is the foundation upon which all other love is built. When we love ourselves, we have more love to give to others.</p>
      
      <h2>Savoring the Sweetness</h2>
      <p>Don't rush through life. Take time to savor the sweet moments—a laugh shared with a friend, a quiet morning with loved ones, the satisfaction of helping someone in need.</p>
    `
  },
  {
    id: "sheets-containing-ipsum-passages",
    image: travelImg,
    category: "Travel",
    title: "Sheets containing Ipsum passages & more",
    author: "Michael John",
    date: "25 Apr 2024",
    excerpt: "A journey through hidden destinations and the stories they tell.",
    readTime: "6 min read",
    content: `
      <p>Travel opens our eyes to new perspectives and possibilities. Every destination has a story to tell, and every journey leaves us changed in some way.</p>
      
      <h2>The Call of Adventure</h2>
      <p>There's something magical about setting off on a new adventure. The anticipation of what lies ahead, the thrill of the unknown, the promise of new experiences—these are the things that make travel so captivating.</p>
      
      <p>Whether you're exploring a bustling city or a remote village, there's always something new to discover. The key is to approach each destination with an open mind and a curious heart.</p>
      
      <h2>Finding Beauty in the Unexpected</h2>
      <p>Some of the best travel experiences are the ones we don't plan for. A chance encounter with a local, a hidden café tucked away in an alley, a sunset that takes your breath away—these are the moments that stay with us long after we've returned home.</p>
      
      <h2>The Journey Continues</h2>
      <p>Travel is not just about the destinations we visit; it's about the person we become along the way. Each trip adds a new layer to our understanding of the world and ourselves.</p>
    `
  },
  {
    id: "alteration-in-some-form",
    image: fashionImg,
    category: "Fashion",
    title: "Alteration in some form, by injected humour",
    author: "Nathan",
    date: "22 Apr 2024",
    excerpt: "Exploring how fashion evolves and reflects our changing identities.",
    readTime: "4 min read",
    content: `
      <p>Fashion is more than just clothing—it's a form of self-expression, a way of telling the world who we are without saying a word. And like us, fashion is constantly evolving.</p>
      
      <h2>The Language of Style</h2>
      <p>What we wear speaks volumes about our personality, mood, and aspirations. A bold pattern might signal confidence, while soft neutrals might suggest a preference for understated elegance.</p>
      
      <h2>Embracing Change</h2>
      <p>As we grow and change, so does our style. What once felt like "us" might no longer resonate, and that's okay. Fashion gives us the freedom to reinvent ourselves as often as we like.</p>
      
      <h2>Finding Your Voice</h2>
      <p>The most stylish people are those who wear what makes them feel authentic. Don't follow trends blindly—use them as inspiration to create a look that's uniquely yours.</p>
    `
  },
  {
    id: "control-about-blind-texts",
    image: lifestyleImg,
    category: "Lifestyle",
    title: "Control about the blind texts it almost unorthographic",
    author: "Emma",
    date: "20 Apr 2024",
    excerpt: "Understanding the art of letting go and finding peace in uncertainty.",
    readTime: "5 min read",
    content: `
      <p>In a world that constantly demands our attention and control, there's profound wisdom in learning to let go. Sometimes the most powerful thing we can do is surrender to the flow of life.</p>
      
      <h2>The Illusion of Control</h2>
      <p>We spend so much energy trying to control outcomes, predict the future, and manage every aspect of our lives. But the truth is, much of life is beyond our control.</p>
      
      <h2>Finding Peace</h2>
      <p>When we accept this truth, something beautiful happens—we find peace. Instead of fighting against the current, we learn to flow with it.</p>
      
      <h2>Living in the Present</h2>
      <p>The present moment is all we truly have. By releasing our grip on the past and our anxiety about the future, we can fully experience the beauty of now.</p>
    `
  },
  {
    id: "art-of-mindful-eating",
    image: nutritionImg,
    category: "Nutrition",
    title: "The art of mindful eating and nourishment",
    author: "Dr. Lisa",
    date: "18 Apr 2024",
    excerpt: "Transform your relationship with food through mindfulness and intention.",
    readTime: "7 min read",
    content: `
      <p>In our fast-paced world, eating has become just another task to check off our list. But what if we approached food with the same mindfulness we bring to other practices?</p>
      
      <h2>What is Mindful Eating?</h2>
      <p>Mindful eating is about paying full attention to the experience of eating. It's noticing the colors, textures, and flavors of your food. It's eating slowly and savoring each bite.</p>
      
      <h2>The Benefits</h2>
      <p>When we eat mindfully, we naturally eat less because we're more attuned to our body's signals. We also enjoy our food more and develop a healthier relationship with eating.</p>
      
      <h2>Getting Started</h2>
      <p>Start small. Choose one meal a day to eat without distractions. Put away your phone, turn off the TV, and simply focus on your food. Notice how it makes you feel.</p>
    `
  },
  {
    id: "creating-peaceful-spaces",
    image: interiorImg,
    category: "Interior",
    title: "Creating peaceful spaces in your home",
    author: "James",
    date: "15 Apr 2024",
    excerpt: "Design principles for transforming your home into a sanctuary of calm.",
    readTime: "6 min read",
    content: `
      <p>Our homes should be our sanctuaries—places where we can retreat from the chaos of the outside world and find peace. Creating this sense of calm is both an art and a science.</p>
      
      <h2>The Power of Decluttering</h2>
      <p>A cluttered space leads to a cluttered mind. Start by removing items that don't serve a purpose or bring you joy. Keep only what you love and need.</p>
      
      <h2>Natural Elements</h2>
      <p>Bring nature indoors with plants, natural materials, and plenty of natural light. These elements have been shown to reduce stress and improve mood.</p>
      
      <h2>Creating Zones</h2>
      <p>Designate different areas of your home for different activities. A reading nook, a meditation corner, a creative space—having dedicated zones helps create order and intention.</p>
    `
  },
  {
    id: "hidden-gems-mediterranean",
    image: travelImg,
    category: "Travel",
    title: "Hidden gems of the Mediterranean coast",
    author: "Nathan",
    date: "12 Apr 2024",
    excerpt: "Discover the secret spots along the Mediterranean that most tourists miss.",
    readTime: "8 min read",
    content: `
      <p>The Mediterranean coast is famous for its stunning beauty, but beyond the popular tourist destinations lie hidden gems waiting to be discovered.</p>
      
      <h2>Off the Beaten Path</h2>
      <p>While everyone flocks to the well-known spots, the real magic often lies in the smaller villages and secluded beaches that few tourists ever see.</p>
      
      <h2>Local Secrets</h2>
      <p>The best way to discover these hidden treasures is to talk to locals. They know the best restaurants, the quietest beaches, and the most scenic viewpoints.</p>
      
      <h2>Slow Travel</h2>
      <p>Instead of trying to see everything, slow down and truly experience one place. Rent an apartment, shop at local markets, and immerse yourself in the rhythm of daily life.</p>
    `
  },
  {
    id: "sustainable-fashion-choices",
    image: fashionImg,
    category: "Fashion",
    title: "Sustainable fashion choices for everyday",
    author: "Maria",
    date: "10 Apr 2024",
    excerpt: "How to build a stylish wardrobe while being kind to the planet.",
    readTime: "5 min read",
    content: `
      <p>Fashion doesn't have to come at the expense of our planet. With a few mindful choices, we can look great while reducing our environmental impact.</p>
      
      <h2>Quality Over Quantity</h2>
      <p>Invest in fewer, better-quality pieces that will last for years. A well-made garment might cost more upfront but will save money and waste in the long run.</p>
      
      <h2>Second-Hand Treasures</h2>
      <p>Thrift stores and vintage shops are treasure troves of unique pieces. Shopping second-hand gives clothes a new life and keeps them out of landfills.</p>
      
      <h2>Care for Your Clothes</h2>
      <p>Proper care extends the life of your garments. Wash less frequently, use cold water, and air dry when possible. Small changes make a big difference.</p>
    `
  }
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

export const searchArticles = (query: string): Article[] => {
  const lowercaseQuery = query.toLowerCase();
  return articles.filter(article =>
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.category.toLowerCase().includes(lowercaseQuery) ||
    article.author.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery)
  );
};
