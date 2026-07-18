---
title: "Paragraphs, Drupal 8, and Twig: A Developer’s Take on Drupalcon New Orleans 2016"
description: "Takeaways from Drupalcon New Orleans on Drupal 8 adoption, Twig theming, and the Paragraphs module."
pubDate: 2016-05-23
category: "Web Development"
tags: ["drupal", "twig", "drupalcon", "conference"]
seo: {}
---
Drupalcon New Orleans was the 3rd Drupalcon I’ve attended, and it never ceases to amaze me how much Drupal has changed over the years, and how much time and effort the community has not just put into core and contrib, but also building out 3rd party tools, scripts, and methods that will benefit other agencies and freelancers as well. It really is a privilege to be a part of a community that is incredibly committed to the values of open source and always willing to share their experience along the way.

Aside from the [#prenote](https://www.instagram.com/p/BFOrPkSAN6P/), catching up with old friends, and [some of the weirdest parties you’ll ever attend](https://www.instagram.com/p/BFS4CXegNzk/) – Drupalcon is the time of year for those who don’t always pay close attention to core updates and community conversations, to catch up on the current trends in the Drupal community and learn about what’s going on and actually how to use these new tools being developed.

This is a short recap of some of the trends and tips I took away from Drupalcon.

**1\. Drupal 8**

Obviously with the release of Drupal 8 late last year, and Drupalcon Los Angeles having a strong showing of sessions prepping us for Drupal 8, it’s no surprise that this topic spanned across a majority of the sessions. Of course, the lingering question remained: “When do we move to Drupal 8?” Last year, there was quite a bit of hesitation while the business community waited for D8 contrib to catch up. This year, it seemed like the resounding answer is, “NOW."

*   A ton of D7 contrib modules ported ([and being funded via the D8 MAP initiative](https://www.acquia.com/blog/acquia-blog/accelerating-drupal-8-adoption/27/01/2016/3291486#animated)).
*   Lots of OOP, Symfony, and migration goodies.
*   And the [advancement of BigPipe caching](https://dev.acquia.com/podcast/bigpipe-drupal-bigger-better-performance-free) in D8 is blowing us away (see graphic below).

![](/uploads/drupal8-bigpipe-graphic.gif)

Of course, it’s not just new Drupal 8 sites that are being built, but migrations from Drupal 6 or 7, so a lot of effort has been going into core migration and the [Migration Tools](https://www.drupal.org/project/migrate_tools) module. With that, the underlying gist is – if you haven’t set sail to Drupal 8 yet, at least start helping build the bridge to get over there.

**2\. TWIG (theming)**

When I first started working in Drupal, I went from a site builder to a front-end developer (I’ve also been known to write a module or two). Since I spend the majority of my days writing CSS and theme functions, I thought I should focus a lot of my attention on new theming developments and front-end tools (Drupal 8 or otherwise).

MortenDK’s talk, [“Drupal8 Theming – Am I doing this right?”](https://events.drupal.org/neworleans2016/sessions/theming-am-i-doing-right) was by far one of the best sessions I attended. While he talks like a Danish pirate, Morten explained everything from how & why Twig, quirks of building a D8 theme (always start with a core base theme, Stable or Classy), and the [disappearance of the theme() function](https://chromatichq.com/blog/badcamp-2015-transitioning-theme-and-theme-functions-render-arrays-and-templates). One big takeaway from Morten’s session was hearing his passion come through about the importance of theming support and development in Drupal 8. Often, front-end functionality is favored less over functionality like content administration and better OOP support. In case you’re wondering, [this is what Drupal looks like without a front-end](https://twitter.com/kyletaylored/status/730067121271676928). Think about it.

**3\. Paragraphs**

At Levelten, we leverage the Bootstrap framework across all of our projects as a solid foundation for our client’s themes, which in turn we develop a lot of tools and modules that help us work better Bootstrap components. Other than a number of block enhancements, a lot of our focus is empowering productivity for our clients through the WYSIWYG. This means leveraging the CKEditor Widgets API and building out templates clients can use to create advanced Bootstrap components, like carousels and jumbotrons.

The plus side to this model is everything is in one field, so when we create summaries or export the content, we’re only dealing with a single body field. The downside is that since it is still HTML in a WYSIWYG, there is an opportunity for clients to potentially break these components by messing with the source and removing necessary attributes, closing tags, etc.

Throughout a number of sessions, I saw multiple demos and sites using the [Paragraphs](https://www.drupal.org/project/paragraphs) module. If you’re unfamiliar with Paragraphs, it essentially lets you create types of paragraphs, or collections of fields, that can be added in any order (if you’ve used the Field Collection module, this should feel familiar). Each paragraph type can then be configured using view modes and custom templates, creating clearly defined templates for your client’s content. While the downside is it’s another field you have to add to your content type, the upside is that it makes it very, very difficult for a client to break while putting in content.

I will admit, as a developer who is constantly trying to build a better experience for editors to create compelling and creative content, this is very enticing.

So what now?

Drupalcon New Orleans was an awesome event, and I’m pretty excited about the future of Drupal. While I couldn’t mention everything in here, I will say that there were some great talks from Acquia / FFW about Personalization and an awesome talk about style guides and patterns from Phase2. I think at this point, I’m fairly eager to get my hands dirty with a Drupal 8 site working on Twig templates and learning more about Symfony.

Who know, maybe I’ll start porting some of my own modules over to Drupal 8.

If you’re a developer who went to Drupalcon New Orleans, what was your take away from the sessions?
