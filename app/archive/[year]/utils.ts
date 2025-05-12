// Process HTML to fix relative URLs and make them go through our proxy
export function processHtml(html: string, year: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Process images
  const images = doc.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = img.getAttribute("src");

    if (src && !src.startsWith("http")) {
      // Handle relative image paths
      if (src.startsWith("/")) {
        // Absolute path from root
        img.setAttribute(
          "src",
          `/api/proxy?year=${year}&path=${encodeURIComponent(src)}`,
        );
      } else {
        // Relative path
        img.setAttribute(
          "src",
          `/api/proxy?year=${year}&path=${encodeURIComponent(`/${src}`)}`,
        );
      }
    }
  }

  // Process links
  const links = doc.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute("href");

    if (
      href &&
      !href.startsWith("http") &&
      !href.startsWith("#") &&
      !href.startsWith("mailto:")
    ) {
      // Handle relative link paths
      if (href.startsWith("/")) {
        // Absolute path from root
        link.setAttribute(
          "href",
          `/api/proxy?year=${year}&path=${encodeURIComponent(href)}`,
        );
      } else {
        // Relative path
        link.setAttribute(
          "href",
          `/api/proxy?year=${year}&path=${encodeURIComponent(`/${href}`)}`,
        );
      }
    }
  }

  // Process stylesheets
  const styleLinks = doc.getElementsByTagName("link");
  for (let i = 0; i < styleLinks.length; i++) {
    const link = styleLinks[i];
    const rel = link.getAttribute("rel");
    const href = link.getAttribute("href");

    if (rel === "stylesheet" && href && !href.startsWith("http")) {
      // Handle relative stylesheet paths
      if (href.startsWith("/")) {
        // Absolute path from root
        link.setAttribute(
          "href",
          `/api/proxy?year=${year}&path=${encodeURIComponent(href)}`,
        );
      } else {
        // Relative path
        link.setAttribute(
          "href",
          `/api/proxy?year=${year}&path=${encodeURIComponent(`/${href}`)}`,
        );
      }
    }
  }

  // Process scripts
  const scripts = doc.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    const src = script.getAttribute("src");

    if (src && !src.startsWith("http")) {
      // Handle relative script paths
      if (src.startsWith("/")) {
        // Absolute path from root
        script.setAttribute(
          "src",
          `/api/proxy?year=${year}&path=${encodeURIComponent(src)}`,
        );
      } else {
        // Relative path
        script.setAttribute(
          "src",
          `/api/proxy?year=${year}&path=${encodeURIComponent(`/${src}`)}`,
        );
      }
    }
  }

  // Extract the body content or return the full HTML
  const bodyElement = doc.getElementsByTagName("body")[0];
  return bodyElement ? bodyElement.innerHTML : html;
}
