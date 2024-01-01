function get_sponsored_links() {
  try {

    // Get all elements with the "Sponsored" text in the h1 tag.
    const sponsoredLinks = [...document.querySelectorAll('.kpih0e.f8ia3c.uvopNe')]
    
    // Extract the parent <div> elements of the sponsored links.
    const sponsoredDivs = sponsoredLinks.map(link => link.closest('.Nv2PK'));
    
    // Extract the links (href) from the sponsored <a> tags.
    const sponsoredLinksList = sponsoredDivs.map(div => div.querySelector('a').href);

    return sponsoredLinksList    
  } catch (error) {
    return []
  }
}

return get_sponsored_links()