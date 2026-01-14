import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Instagram, Youtube, Mail } from "lucide-react";
import featuredImg from "@/assets/featured-post.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="blog-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/50 rounded-sm -z-10"></div>
                  <img
                    src={featuredImg}
                    alt="About me"
                    className="w-full aspect-[4/5] object-cover rounded-sm"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <span className="category-label">About Me</span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mt-4 mb-6">
                  Hello, I'm Sarah
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Welcome to Venal, a space where I share stories about mindful living, 
                    travel adventures, and finding beauty in everyday moments.
                  </p>
                  <p>
                    I started this blog as a creative outlet to document my journey towards 
                    a more intentional life. What began as personal notes has grown into a 
                    community of like-minded souls seeking balance and authenticity.
                  </p>
                  <p>
                    When I'm not writing or creating content, you'll find me exploring local 
                    farmers markets, practicing yoga, or planning my next travel adventure. 
                    I believe in slow living, sustainable choices, and the power of small 
                    daily rituals.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-8">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="blog-container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                What I Believe In
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "Mindful Living",
                  description: "Being present in each moment and making intentional choices that align with our values.",
                },
                {
                  title: "Sustainable Beauty",
                  description: "Finding elegance in simplicity and choosing quality over quantity in all aspects of life.",
                },
                {
                  title: "Authentic Connection",
                  description: "Building genuine relationships and sharing stories that inspire and uplift others.",
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-20">
          <div className="blog-container">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
                Let's Connect
              </h2>
              <p className="text-muted-foreground mb-8">
                Have a question, collaboration idea, or just want to say hello? 
                I'd love to hear from you.
              </p>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium rounded-full hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
