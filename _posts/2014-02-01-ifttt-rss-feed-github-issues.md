---
layout: post
title:  "How I use IFTTT and a RSS feed to create GitHub issues"
date:   2014-01-28 11:44:00
categories: blog
tags: IFTTT github API
---
<div>
	<img src="/images/ifttt_logo.svg" alt="">
</div>
Every time I push a new post to this blog a new issue (that you can comment on) inside [this github project](https://github.com/musca/musca.github.io) gets created and these How I do this? Read on to learn.

IFTTT is a service that ties other internet services and apis together. In my case I needed my blog RSS feed to be scanned and if a new item is detected a new issue is opened	 in the github repo and my readers can comment on it just like a blog. 

<div>
	<img src="/images/IFTTT-rss-github.png" class="small" alt="">
</div>

First we need to create a account on [ITFFF](https://ifttt.com/join). After that you need to activate the GitHub channel so we can create new issues in the repo. Follow the the instructions and accepts the IFTTT oAuth request. When thats out of the way we need to create a new recipe. Let's Get Cooking. 

Click the __create__ menu item and then the huge blue link thats says __this__.
Choose a trigger channel and add a New feed item. In the feed Url input you paste your feed URL and press Create Trigger. Now we need to fix the "Then That" part of the recipe.

<div>
	<img src="/images/if-this.png" class="small" alt="">
</div>

In the __Then That__ part we need to accept IFTTT as a GitHub app to make comments on issues. 