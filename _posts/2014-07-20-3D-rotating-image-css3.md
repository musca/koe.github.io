---
layout: post
title:  "3D Rotating image with CSS3"
date:   2014-07-20 13:15:00
categories: blog
tags: 3D Rotating image CSS3
---


<style>
	#logo {
		width: 140px;
		height: 140px;
		margin: 0 auto;
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
<img src="/images/logo.svg" id="logo" alt="" />


	<img src="/images/logo.svg" id="logo" alt="" />

	#logo {
		-webkit-animation: loading 20s linear infinite;
		   -moz-animation: loading 20s linear infinite;
		        animation: loading 20s linear infinite;
	}
	@-webkit-keyframes loading {
		from { -webkit-transform: perspective(800px) rotateY(0deg); }
		to { -webkit-transform: perspective(800px) rotateY(-360deg); }
	}
	@-moz-keyframes loading {
		from { -moz-transform: perspective(400px) rotateY(0deg); }
		to { -moz-transform: perspective(400px) rotateY(-360deg); }
	}
	@keyframes loading {
		from { transform: perspective(400px) rotateY(0deg); }
		to { transform: perspective(400px) rotateY(-360deg); }
	}
