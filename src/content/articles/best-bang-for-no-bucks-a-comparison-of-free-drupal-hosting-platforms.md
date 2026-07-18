---
title: "Best Bang for No Bucks – A Comparison of Free Drupal Hosting Platforms"
description: "A comparison of free Drupal hosting platforms to help you find the best performance and tools without spending a dime."
pubDate: 2013-07-18
category: "Web Development"
tags: ["drupal", "hosting", "open source"]
seo: {}
---
It’s a tough life in the open source world. We have constant access to thousands of free repositories, tools, and systems… and we love it. It’s like a digital flea market, but everything is up for grabs and there isn’t a limit of how much you can carry (except your hard drive). But one of the hardest resources for us to find for free is server space for hosting the awesome things we build. We can use Github Pages for static site hosting, but you’re limited to only HTML/CSS/JS. In this particular case, we want to host things with a backend and a database, like Drupal. I’ll be going over a couple of the free platforms you can use to build your Drupal site on, and which one will give you the best performance and tools for the big ol’ price of nothing.

**Clarification: What’s the purpose of this experiment.**

This is meant to be an unbiased, analytics driven comparison of performance and features for various places you can build your Drupal site for free. These results will most likely be most beneficial to developers looking to build a public facing development site for their clients, while it might be somewhat useful for hobbyists or those who are looking to just try out Drupal. I compared four different services that let you install Drupal for free: [Amazon Web Services](http://aws.amazon.com/), [OpenShift](https://www.openshift.com/), [Pantheon](https://www.getpantheon.com/), and [Acquia Free Cloud](https://www.acquia.com/acquia-cloud-for-free). Each platform is built for something a little bit different with their own pros and cons, but they all have the ability to build and host a Drupal website for free, which is exactly what we’re looking for. Some questions this experiment should answer:

1.  Which environment takes the least amount of steps to spin up a Drupal site?
2.  What features and tools are available to us to make our development lives easier?
3.  When the time does come move our site into production, who makes that the easiest?

**The Experiment**

For each site, I performed exactly the same steps on each environment. In the case of AWS, I had to first build the server with as little steps as possible. I had first built it with Apache, but decided to go with Nginx instead, following the [steps posted by David Nurman](http://www.civicactions.com/blog/2013/apr/22/installing_drupal_8_on_ubuntu_1304_with_nginx). Since I was going for the least number of steps, I didn’t set up any extra caching functions like memcache or varnish in AWS. The reason is that other systems already have this built in, so we can consider this an extra feature when choosing a development environment.

1.  Each site started with the same base Drupal install with the most current 7.22.
2.  Installed extra modules: Admin Menu, BlazeMeter, Devel, and LevelTen’s in-house Blog feature.
3.  Generated 50 pieces of content.
4.  Set up BlazeMeter tests with exactly the same settings.
    1.  250 Anonymous users
    2.  Selected three random nodes to test.
    3.  10 authenticated users
    4.  Selected status report and module list pages to test, since they both load system data.
    5.  Set testing location the same for each test.
5.  Ran with and without caching for each site.

**Load Testing**

In order to compare the various sites and setups in terms of performance, I used BlazeMeter’s free Drupal plugin and a free BlazeMeter account (it’s free for up to 10 load tests per month). BlazeMeter provides a plethora of performance testing data such as response time (for the entire page), latency (time to first byte), hits@sec, KB@sec, errors@sec (with a breakdown for each error type) and others as well – all presented as the load test is running.

Ophir Prusak from [BlazeMeter](http://blazemeter.com/our-team) was incredibly helpful and invited me to a Google Hangout regarding how to best compare the performance of each platform:

"For most Drupal sites, the most important KPI you’ll want to look at is **response time vs. number of concurrent users**. This is the best way to do an apples to apples comparison for different service providers or different infrastructure. You should be looking at (1) response time under low load (ie less than 10 users), which is your baseline response time. (2) The slowdown point (in terms of users) when the response time starts to rise and (3) the breaking point when the response time skyrockets and/or a large percentage of responses are errors."

He also suggested using an application performance monitoring system such as New Relic to provide detailed back end server load data. BlazeMeter has a two way integration with New Relic, so it’s easy to do all of your performance analysis in one place. If you’d like to try your own BlazeMeter load test, they have a great [SlideShare presentation](http://www.slideshare.net/BlazeMeter/blazemeter-presents-at-the-high-performance-drupal-meetup) on integrating with Drupal.

**What does it all mean?!**

I know, looking at the [total comparison chart](https://docs.google.com/a/getlevelten.com/spreadsheet/pub?key=0AjebZU0kGDegdHBRczBpaThPS29rNC15SGRTZllfLVE), or the individual results posted below, there’s a lot of numbers and lines and whatnot. Across the board, the results were pretty consistent in terms of response time when comparing caching on and off. The only one that is a little weird is the AWS w/ Nginx results with caching, which Ophir had explained to me that when the response time or latency is that low, it generally means that the EC2 I was running is more than likely in the same physical location as the server running the test. Since the testing server and the instance were both on AWS, that’s probably the case.

**Caching**

Caching is a great test to show how each platform implements and handles caching pages and serving requests using Varnish, APC, and/or Memcache. The overall winner with caching turned on is **Pantheon**. They stayed consistently at <100ms during the entire test. In second place was Acquia varying in the 100ms to 350ms range, OpenShift not doing a bad job at keeping up with requests in the 1000ms to 6000ms range (not terrible for a free environment), and then last is AWS with some crazy response times that are all over the place. We’ll talk more about that in a minute. If you want to confirm the results, we can look at the HTTP response headers in the BlazeMeter tests and [check the Age header](http://helpdesk.getpantheon.com/customer/portal/articles/425726). If it’s greater than 0, we know the page is cached.

**No Caching**

This test is what separates the hardware from the… other hardware. By not caching, we are bootstrapping Drupal every time and putting more stress on the server than usual. By looking at the comparison, we can see that once again, **Pantheon** is the winner, staying consistently around 0.9 seconds to 1.3 seconds. Following up once again is Acquia, staying around 10 to 20 seconds per response. The last two following up is AWS w/ Nginx that stayed constantly around 63 seconds and OpenShift staying around 110 seconds to load. Looking closer, we can see that at around 60 active users, AWS and OpenShift started to slow up a lot. Once again, we can check the Age header in the HTTP response headers to see that they’re at 0, which means they aren’t cached.

**Accounting for Errors**

Of course, we have to take a bit of this with a grain of salt. We can look at the error reports tab and embedded resource errors in the BlazeMeter reports, and if we find a significant number of errors, we can see how each different metric is affect. Luckily, most of these are pretty consistent, but AWS for instance, it throws a lot of errors for cached pages, but it turned out that it’s actually an Nginx setting that I needed to configure for cached images.

**The** **Deal with Performance**

After getting some preliminary results, I was able to talk with Zack Rosen and Josh Koenig at Pantheon about how they built their structure to give their users the best performance possible and how they handle caching, which is enabled by default.

"Based on the > 100x improvement in performance in testing up, I’ll bet what you’re seeing is Pantheon’s integrated edge caching (aka Styx) kicking in. It’s far far better than the internal Drupal page cache under concurrency, which is what you’re really stressing here. Styx is a combination of Varnish, an effective firewall, and a NodeJS routing system which correctly directs incoming requests to an appropriate worker-process container (a "DROP" in our parlance) within the platform."

Josh also notes that once you get past 50 – 100 users, it doesn’t matter what webserver or PHP flavor you run: at that scale, even serving light-weight page cache responses Drupal will get bogged down with requests. This is the origin of the infamous ["slashdot effect"](https://en.wikipedia.org/wiki/Slashdot_effect). Pantheon gives each environment 4 DROPS to handle serving up non-cached pages. I also learned that Pantheon built it’s system around container virtualization instead of virtual machine instances, which has a lot of performance improvements over standard virtual machines. You can read the [differences between containers and virtual hosts](http://searchservervirtualization.techtarget.com/tip/Virtualization-performance-and-container-based-virtualization) or take a look at a [comparison chart](http://www.servernest.com/container-virtual-machine.html). The skinny is basically containers are built on top of beefy hardware running a single, optimized OS while virtual hosts are individual instances of operating systems that can be configured radically different from one another.

In comparison, I also had the chance to ask Andrew Kenney, VP of Platform Engineering at Acquia, about how they handle caching to achieve low response times. 

"Acquia utilizes a multi-tiered caching strategy for its platform including Varnish, Memcached and APC caching systems. All requests flow through Varnish which ensures the fastest possible response for anonymous traffic and static media assets. Additionally, Acquia utilizes memcached extensively to enable Drupal to cache objects and blocks. APC is enabled by default allowing Drupal PHP scripts to be opcode accelerated and dramatically speed up their execution."

Acquia doesn’t enable caching by default, and for good reason. Since you’re building on a dev environment, turning caching off helps with debugging in Drupal. Andrew also noted that in the Free Tier, each dev environment is limited to 2 PHP processes to serve up non-cached pages. Acquia is hosted on AWS and normal Acquia Cloud sites are ran on their own instance while the Free Tier accounts are on a shared environment, hence the limited processes.

**Conclusion**

**Last Place: AWS**

Though we have the ability to install and configure almost anything we want, that is also the downfall with human error. We want to be able to set up our Drupal site in as few steps as possible and not have to worry about the performance if we aren’t a server guru, and by telling from the results, this obviously is the case. AWS also only gives us one free year (750 computing hours) of hosting, after that it’s time to pay up. If you build a plethora of custom applications that you need a test bed for, I’d go with AWS. If not, go ahead and skip that option.

**Third Place: OpenShift**

I’ll admit, I’m fairly impressed with OpenShift. Their system is based on "cartridges" that you can install for added features, such as extra metrics or MongoDB. Unfortunately their performance wasn’t up par enough, and they don’t have an easy way to go from dev -> test -> production. We’ll look more at their features in the next post, but if you want just a Drupal environment, skip this as well.

**Second Place: Acquia**

This was a tough call, but the analytics are against them in this one. They have an intuitive developer workflow and integrated statistics, but unfortunately their results weren’t up to par, but the results are probably due to it being on shared hosting. They only allow one development environment (for now) and their pricing is a little steep when the time comes to move to a live environment.

**First Place: Pantheon**

Compared to the others, Pantheon gave us everything. We have 2 dev sites we can work with, dev to production workflow, an intuitive GUI, a competitive price for production, and great performance when under pressure. So if you needed free Drupal hosting, Pantheon comes out on top with everything you need optimized for Drupal.

Like I noted before, this was an unbiased, analytics driven report of the top free Drupal hosting platforms and how they handle under pressure. I didn’t get the chance to get to features and usability in this post, but that requires a little more opinion and criticism than just the numbers we have today. All of that, and more from Pantheon and Acquia, over their choice and implementation of toolsets and features will be in my next blog post, so stay tuned.

I’d like to thank everyone who participated and helped out with this report: Ophir and the team at BlazeMeter, Zack/Josh and the team at Pantheon, and Andrew/Hannah and the team at Acquia.
