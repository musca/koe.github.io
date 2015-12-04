---
layout: post
title:  "3D Rotating image with CSS3"
date:   2014-07-20 13:15:00
categories: blog
tags: 3D Rotating image CSS3
js: blog
css: main
headerImg: html5_3d_effects.svg
bgColor: ee5050
color: white
---

<!--more-->
<style>
	.header-image {
		width: 140px;
		height: 140px;
		margin: 2em auto;
		display: block;
	  -webkit-animation: loading 20s linear infinite;
	  	 -moz-animation: loading 20s linear infinite;
	  				animation: loading 20s linear infinite;
	}

	@-webkit-keyframes loading {
	  from {
	    -webkit-transform: perspective(800px) rotateY(0deg); }

	  to {
	    -webkit-transform: perspective(800px) rotateY(-360deg); }
	}
	@-moz-keyframes loading {
	  from {
	    -moz-transform: perspective(400px) rotateY(0deg); }

	  to {
	    -moz-transform: perspective(400px) rotateY(-360deg); }
	}
	@keyframes loading {
	  from {
	    transform: perspective(400px) rotateY(0deg); }

	  to {
	    transform: perspective(400px) rotateY(-360deg); }
	}
</style>


	<img src="/dist/img/logo.svg" class="logo">

	.logo {
      animation: loading 20s linear infinite;
	}

	@keyframes loading {
      from { 
        transform: perspective(400px) rotateY(0deg); 
      }
      to { 
        transform: perspective(400px) rotateY(-360deg); 
      }
	}
