import { SiteContext } from "@/contexts/SiteContext";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  const { site } = useContext(SiteContext);

  return (
    <Helmet>
      {title ? (
        <title>{title} - {site?.blogTitle || "Blog"}</title>
      ) : (
        <title>{site?.blogTitle || "Blog"}</title>
      )}

      <meta
        name="description"
        content={
          site?.blogDescription ||
          "A minimalist journal on slow productivity and intentional living."
        }
      />
      
      <link rel="icon" href={site?.blogIcon || "/webicon.png"} />
    </Helmet>
  );
};

export default PageTitle;