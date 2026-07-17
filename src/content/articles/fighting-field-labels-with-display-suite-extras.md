---
title: "Fighting Field Labels with Display Suite Extras"
description: "If you are a site builder or themer in Drupal, you might have a similar situation happen to you. You obtain a set of requirements for a content type, create all the necessary fields with semantic labels, and start building the displays and views. Great! Life is good. Now your project manager waltzes over to your desk to deliver an updated set of wireframes, and before you even get halfway down the page, you feel a breeze as you notice a person-shaped cloud of dust where your project manager just stood. You look at the document and see that on some displays, you will find a field label with a colon and some… without. Of course, you appropriately let out a lion of a roar that echoes throughout the office, because not only do you have you remove that colon from specific labels, but some of the labels even have different names depending on the display by dpm-ing the crap of the field template."
pubDate: 2013-05-09
category: "Web Development"
tags: ["drupal", "display suite", "theming"]
seo: {}
---
If you are a site builder or themer in Drupal, you might have a similar situation happen to you. You obtain a set of requirements for a content type, create all the necessary fields with semantic labels, and start building the displays and views. Great! Life is good. Now your project manager waltzes over to your desk to deliver an updated set of wireframes, and before you even get halfway down the page, you feel a breeze as you notice a person-shaped cloud of dust where your project manager just stood. You look at the document and see that on some displays, you will find a field label with a colon and some… without. Of course, you appropriately let out a lion of a roar that echoes throughout the office, because not only do you have you remove that colon from specific labels, but some of the labels even have different names depending on the display by dpm-ing the crap of the field template.

So you might have some questions by now, such as "Who prints out their wireframes anymore, can’t they email it to you?" and "How dirty is your office that it leaves a cloud of dust?". It’s odd, I know, but don’t mind that. The biggest question is, how can we make this easier? Simple, we use [Display Suite](http://drupal.org/project/ds).

To be more precise, use Display Suite Extras. DS Extras is packed with bunch of features that will make your life a whole lot easier when it comes do having really complicated, or sometimes mind-boggling, displays. A few features include: 

*   Region to Block – Put fields into a new region that is then turned into a block to be set in the block system, such as the sidebar or footer. This could be like a testimonial or image field.
*   Views Displays – Create a display for a View that turns sections into "fields" that can then be placed into a new layout, such as moving the pager to a header section above the content and exposed filters to the footer below.
*   Page Title Options – Customized page titles, like hiding it on certain displays or displaying a static title for all nodes of a certain content type, i.e. Reviews.

In short, we love Display Suite here because it does some really awesome stuff and makes our job way more fun. Now that you’ve heard about some of the other features, let’s talk about this magical **field template**. Enable Display Suite Extras and head to configuration to enable **Field Templates**. There you can set a default field template, either Drupal default, full reset, or minimal. **Full reset** removes all extra field markup, while **minimal** leaves just the topmost field identification, i.e. field and field-name classes.

<field template comparison image>

Pick a content type and go to it’s display settings and set a layout if you haven’t yet already. Notice now that each field can be configured with it’s own field template (default, full reset, minimal, and advanced). By default without even changing the field template, we can reset the label to whatever we like. An instance you might use this could be you have a field called "Programs" that is a multi value field of software programs. If we limit the field to a single value, that label could appropriately be labeled singular "Program". If we list all programs, it could also be labeled as "System", meaning a collection of programs.

Is it against my logical, non-literature background to name these fields in such a incredibly not semantic way? Yes. But, I’m a developer and I was given a set of specs, so damn it, I’ll make it work no matter how grammatically incorrect or structurally awkward it might be.

Choosing the minimal field template, we can easily select a checkbox to remove that pesky little colon and replace the label if necessary. For the majority of these situations, this is all I will ever need. If you dare to select the Expert setting, you shall be wowed. You can customize every single little detail of the field template, from the wrapping element to custom classes and attributes. Very rarely do we need this, but it’s really nice to have when you do.

<insert expert screenshot>

Now that you know, you think it’s awesome, right? I know, it’s awesome. To put the icing on the cake, all of these settings are exportable into features…

_Did you ever want to eliminate a race of rare rainbow unicorns because you had to override multiple field templates? Tell us in the comments below!_
