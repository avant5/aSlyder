# aSlyder Settings

The settings for the aSlyder slideshow are done entirely with CSS classes on the HTML page where the slideshow resides.  No configurations are done inside of any javascript.  It is recommended to use the current class names, but the legacy classes remain in the code for backwards compatibility at this time.  In the future, the legacy classes may be deprecated and eventually removed from the code.

## Slider Types

### Default (no classes)

With no added classes, the slideshow runs simply as the basic expected slideshow behavior.  The series of slides each moving into place from the right side of the slideshow area, and returning to slide one (left-most) at the completion of the series.  See the default settings at the bottom of this document for a complete list of all default settings and behaviors.  Only one slider type can be in effect at a time.

### aslyder-flow
###### Legacy: contslide

Flow or Continuous-slide style is similar to the default slideshow style, except that the slides continually flow from the right, rather than snapping back to the beginning at the end of the slideshow.  This setting only impacts the default slide-type slideshow.  This setting has no effect on fade or peel type transitions.

### aslyder-fade
###### Legacy: fadetype

The Fade-type slideshow stacks the slides on "top" of each other and the slides fade out to reveal the slide underneath.

### peel-{direction}

The peel-type transition imitates the sliding of a card off the top of a stack of cards, rather than the entire set of slides moving into a position.  The peel transition has five available directions, up|down|left|right|random.  The direction is appended to the class to indicate the direction of choice.  If random is selected, a random choice of the other four directions will be chosen for each slide.  Default direction: down.

```
peel-right
```

## Effect variables

### pause-{ms}

The pause setting determines the amount of time a slide is displayed once it has fully transitioned into full view in the slideshow.  The amount is in milliseconds, so a setting of 1000 is equal to one second.  Any positive number can be used.  

```
pause-3000
```

### speed-{ms}

The speed setting controls the transition time between slides, for all methods.  This can be thought of as the time that the current slide is removed from view and the next slide is fully visible.  The speed setting is in milliseconds.

```
speed-800
```

> note: The transition speed settings differ from the old version of aSlyder where the transition times overlapped and transition time was a part of the slide display time (pause).  The two now run independently, so the transition time starts after the slide display time, and the new slide pause time begins after the transition completes.  In the previous version of aSlyder, setting the pause and speed time to the same amount would result in a non-stop action display.  To achieve this same effect now a pause time of '0' would be needed.

### Default Settings
- type: Slide + snapback
- pause: 5000 (ms)
- speed: 800 (ms)

