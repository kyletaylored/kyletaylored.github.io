---
title: "Facet Blocks – The Unknown Hero"
description: "If you have ever worked with Search API, Facet API, and Solr, you know how awesome and powerful these tools are, especially when combined with Views. Unfortunately the way it works, sometimes you’re forced to build some things a little bit differently to get around some of these pitfalls. Unfortunately, I haven’t seen one piece of documentation on the Facet Block views plugin, and it took me awhile to figure out that the hell it was there for, so I’m sharing my research with the people of the internet."
pubDate: 2013-04-11
category: "Uncategorized"
tags: ["post"]
author:
  name: Kyle Taylor
  role: Creative Engineer
seo: {}
---
If you have ever worked with Search API, Facet API, and Solr, you know how awesome and powerful these tools are, especially when combined with Views. Unfortunately the way it works, sometimes you’re forced to build some things a little bit differently to get around some of these pitfalls. Unfortunately, I haven’t seen one piece of documentation on the Facet Block views plugin, and it took me awhile to figure out that the hell it was there for, so I’m sharing my research with the people of the internet.

Starting with a quick run down, whenever you use a Views search page, you base it off the index you built in Search API. So if I defined and built an index for all nodes that filters on a title, body, and taxonomy fields, that is the index we build the view on. Once you have your search view and facets configured, you’re all set! Now we can go to our search page and start filtering out results to drill down to exactly what we’re looking for. The facets work by hooking into the query that is being run by Views to alter what is being returned based on the selected filter. Great, let’s put these facets on a landing page so people can immediately start searching for something!

… derp. Nothing. The reason the facets don’t show up is because there isn’t a search query being run on that page, and I don’t want to have to make another search view page for a landing page, and blah blah blah. It gets ugly. So what are the other options? Well, the most popular fix was something I call "faux facets". We basically create a regular block view of taxonomy terms for whatever vocabulary I’m indexing, and then rewrite the URLs with the equivalent search URL, which may look something like this: 

http://example.com/content-section/search?f\[0\]=field\_category%3A36

That’s a bucket of fun if I’ve ever seen it. Now I have to style the thing to look just like the facet block I already have, it might not have the same count number as the facet, and it’s very frustrating. Luckily, we now have something up our sleeve – the Facet Block display.

\[insert screenshot of options\]

We can create a Facet Block display on our current search view, give it a name, tell it which search page we want it to redirect to, and what Facet field information (like a Category taxonomy) we want to display. And the best part is, we can put this anywhere we want! No more random view pages or faux facet taxonomy blocks, we can use the data given to us by the search index.

_Do you use Search API often? What are some of the tricks you use to build more effective searches?_
