import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Instagram, Youtube, Mail, Facebook } from "lucide-react";
import { useContext} from "react";
import PageTransition from "@/components/PageTransition";
import PageTitle from "@/components/PageTitle";
import { SiteContext } from "@/contexts/SiteContext";

const About = () => {
  const {site} = useContext(SiteContext);

  return (
    <>
      <PageTitle title="About" />
      <PageTransition>
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
                      {site?.avatar &&
                        (
                        <img
                          src={site.avatar}
                          alt="About me"
                          className="w-full aspect-[4/5] object-cover rounded-sm"
                        />
                        )
                      }
                    </div>
                  </div>

                  {/* Content */}
                  <div className="order-1 lg:order-2">
                    <span className="category-label">About Me</span>
                    {site && (
                      <>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mt-4 mb-6">
                          Hello, I'm {site.blogName}
                        </h1>

                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <p>
                            {site.about}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                          <a
                            href={site.instagramURL}
                            className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Instagram className="w-5 h-5" />
                          </a>
                          <a
                            href={site.facebookURL}
                            className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                        </div>
                      </>)
                    }

                    {/* Social Links */}
            
                  </div>
                </div>
              </div>
            </section>

            {/* Current Focus Section */}
            <section className="py-12 md:py-16 bg-secondary/30">
              <div className="blog-container">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                    What I'm Working On
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                  {[
                    {
                      title: "Building Products",
                      description:
                        "Designing and shipping real-world projects that solve practical problems.",
                    },
                    {
                      title: "AI & Web Development",
                      description:
                        "Exploring the intersection of machine learning and modern web systems.",
                    },
                    {
                      title: "Writing & Sharing",
                      description:
                        "Documenting what I learn so others can build faster and smarter.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="text-center">
                      <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            {/* <section className="py-12 md:py-20">
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
            </section> */}
          </main>
          <Footer />
        </div>
      </PageTransition>
    </>
  );
};

export default About;
