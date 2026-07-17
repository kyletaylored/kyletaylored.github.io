---
title: "Radioactivity – Popularity by Decay"
description: "Radioactivity is an awesome Drupal module that gives you a \"hotness\" metric for content, basically popularity or trend by the number of views the content receives. Based on how a lot of the other popularity-based modules work, such as FiveStar and Rate that requires user interaction, Radioactivity will give you the most organic results. This method works great if you publish a lot of content that is aimed for public consumption, magazines or media publishing sites like Popular Science and the Bravo TV network."
pubDate: 2013-04-13
category: "Uncategorized"
tags: ["post"]
seo: {}
---
[Radioactivity](http://drupal.org/project/radioactivity) is an awesome Drupal module that gives you a "hotness" metric for content, basically popularity or trend by the number of views the content receives. Based on how a lot of the other popularity-based modules work, such as FiveStar and Rate that requires user interaction, Radioactivity will give you the most organic results. This method works great if you publish a lot of content that is aimed for public consumption, magazines or media publishing sites like [Popular Science](http://www.popsci.com/) and the Bravo TV network.

To install and use Radioactivity in Drupal 7 is relatively simple. Download and enable Radioactivity and Views, while you can optionally use Display Suite (one of my favorites) and Devel to generate some test content if you don’t have any.

You can start by creating a decay profile, but Radioactivity 7.x-2.8 comes shipped with some default profiles as features (if you want to enable that). When you create a profile, there are three main settings you need to know. 

*   **Incident storage**, which is how the energy level changes will be written and stored.
*   **Profile mode**, which is how the articles will gain and lose popularity.
*   **Time period**, the amount of time you set for the half-life.

Just to make it easy, I set the defaults to live storage, basic, and six hours. It really depends on what is the best setting that will fit your website, such as if you post a lot of articles or not, your average amount of traffic, etc. If you choose the advanced profile mode, you even have the option to set granularity. This means that if you choose a half-life of 6 hours and a granularity of an hour, the energy level will go down by 8.3% (or 1/6 of half of the energy) every hour. Just know that a finer granularity can bring down performance because it is writing to the database more often than usual.

The next step is to add the Radioactivity field to the content type you’d like to track. It’s really just as easy as adding a field called "Energy Level" (most descriptive), and setting a default value for all new pieces of content you create. What we do with this field is very important. In order for Radioactivity to work correctly, we need to tell it when to do and don’t emit energy (raise popularity) based on the display. For instance, if we have a list article teasers, we don’t want the energy field to go up, because then it will go up for all the articles in that list and that’s a little counter productive. So either we set the emitter to 0, disabling it, or we just don’t use the energy field on that display at all. Now we do want it to increase when user view each individual article, so we can put it on the Full Content or Default display. Then we can set how much energy we want to be added with accuracy each time the content is viewed.

The last part is simply just making a view that sorts descending by the energy level. Usually this isn’t just a random view by itself, but a part of an existing set of view display, such as displays related to blog posts that show various categories, contributors, etc. So we would just make a small list of articles based on popularity, most likely conveniently called "Popular Posts", but that’s just me.

There are also some advanced settings to Radioactivity such as flood control (making sure users or authors aren’t spamming their own articles or products with page views to boost their rating), memcache settings, and adding a hard coded configuration for some Drupal settings.

Just to sum it up, Radioactivity is an incredibly awesome module that we can use to organically show the popularity and trending of content on our sites. If you haven’t used it yet, I recommend giving it a whirl.
