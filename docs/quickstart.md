# Quickstart Guide (WIP)

This application was developed as a tool for web professionals, and as such some assumptions are made about the reader.  Basic HTML and CSS skills are required, as well as the ability to understand a server file system and to link Javascript files to an HTML document.  This guide does not cover these very basic concepts, and only addresses specific setup and configuration of the Slideshow itself.

aSlyder requires [jQuery 3+](https://jquery.com/download)

### The HTML

The slideshow container must have the ID #aslyder.  This should be a <div> but any block level container will work.  Inside the slideshow container a UL is required.  After that a LI for each slide.  These must not be wrapper in additional containers.  The script addresses the slides as direct children, not by class, so this structure is required.

```
<div id="aslyder">
  <ul>
    <li>Slide One</li>
    <li>Slide Two</li>
    <li>Slide ...</li>
  </ul>
</div>
```

Slides can contain any manner of content: images, text, video, even other HTML lists.

## The CSS

The CSS for the slideshow is simple but varies slightly depending on the style of slideshow desired.  For fade and peel-off styles the CSS is supposed to be automatically set up by the program, but at the time of this writing that feature has not been transferred from the original.

```
#aslyder { position:relative; overflow:hidden; height:300px; width:550px;}
#aslyder > ul { position:relative; height:100%; white-space:nowrap; }
#aslyder > ul > li { display:inline-block; width:550px; height:auto; }
#aslyder > ul > li img { width:100%; height:auto; }
```

The height and width are, naturally, specific to your site's own design needs.  Change the height and width for responsive designs.  To convert a slideshow into a vertical stack of images for a mobile version, remove the height and positioning from the UL, and the height and overflow from #aslyder.

## That's it!

The slideshow will run automatically.  There is no need to add any javascript or code to direct the slideshow or tell it to start.  It will start automatically at the default settings.  