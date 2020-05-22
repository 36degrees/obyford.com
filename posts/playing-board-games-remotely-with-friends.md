---
title: Playing board games remotely with friends
description: My setup for playing Pandemic remotely using a camera, tripod and Google Meet
date: 2020-03-21
---

In an effort to stay sane whilst practising [social distancing](https://www.gov.uk/government/publications/covid-19-guidance-on-social-distancing-and-for-vulnerable-people), Emily and I tried using a camera, tripod and Google Meet to play [Pandemic](https://zmangames.com/en/games/pandemic/) with our friends Emma and Chris, remotely.{.paragraph--lead}

I thought it was worth sharing how we did it.{.paragraph--lead}

It's very specific to the equipment that we have available to us (a Canon DSLR, and a Mac) but I hope it's a useful starting point.

[[toc]]

## The hardware

We used a Canon 80D with a 10-18mm lens, mounted upside-down on a Benro Slim CF tripod[^1], and connected to my MacBook Pro via USB.

We set the tripod up on our dining room table, and laid out Pandemic underneath.

![The setup that we used for the game, as described above](/img/playing-board-games-remotely/setup.jpg){.img--border}

Because we were playing at night, and had the tripod positioned directly under the dining room light, we also used a desk lamp to illuminate the board and get rid of the shadows from the tripod.

I was expecting to have to change the camera battery during the game, but it held up pretty well, with a little under 50% left after a good couple of hours of gameplay. I'd definitely recommend starting with a fully charged battery, or a power adaptor if you've got one.

### Not got an SLR or a tripod?

You may be able to achieve similar results using a phone or webcam – you just need a fairly wide angle lens so that you can get the whole board in.

As for the tripod, if now's not the time to procrastinate with a little creative engineering for the mounting, when is?! I reckon I'd start with a couple of chairs, a broom, and some cable ties.

## The software

To use the DSLR as a webcam with my MacBook Pro, I followed [this tutorial from CrowdCast](https://docs.crowdcast.io/en/articles/1935406-how-to-use-your-dslr-as-a-webcam), installing:

- [Camera Live](https://github.com/v002/v002-Camera-Live/releases)[^2], which provides a [Syphon server](http://syphon.v002.info/) for a compatible Canon DSLR
- [CamTwist Studio](http://camtwiststudio.com/download/), which turns the Syphon video source into something that can be used as a video source within your video chat software. It also provides effects that you can use to flip the video, and the ability to include another video source as 'picture in picture' (PIP).

We adjusted the output video size to 1280x720 in CamTwist Studio preferences (which required us to then quit and re-open it).

![Screenshot of the preferences window, showing the output video size set to 1280x720](/img/playing-board-games-remotely/preferences.png)

Otherwise, the configuration that we used for CamTwist Studio was, from top to bottom:

- **Syphon**, with the _Camera Live_ server selected within Settings
- **Upside Down** – depending on how your camera is orientated, you may not need this
- **LR Flip**
- **PIP Webcam**, scaled and positioned out of the way of the important bits of the board

![Screenshot of the CamTwist Studio interface with the configuration described above](/img/playing-board-games-remotely/camtwist.png)

We used Google Meet, setting the video source to CamTwist Studio (there's two of them for some reason, but they both seem to work) and bumping the resolution to 'high definition'[^3].

![Screenshot of Google Meet video preferences, with the Camera set to 'CamTwist Studio' and the send and receive resolutions set to 'High definition (720p)'](/img/playing-board-games-remotely/meet.png){.img--border}

### Not got a Mac?

These instructions probably won't help you that much. Thankfully, [there's Google](https://www.google.com/search?q=use+SLR+as+webcam+windows).

If you're using your phone as a camera, you may just be able to connect directly to the video chat.

## The barware

As you may notice from the photo, we were drinking champagne, because it was Emily's 30th birthday on Thursday, and quite frankly if that's not a good enough reason what is.

Anyway, it definitely added a certain _je-ne-sais-quoi_ to the experience and I would 100% recommend it.

Emma and Chris had some terrible wine that 'tasted like piss'. They would 100% not recommend it.

## The game

We played Pandemic, which may seem distasteful to some but:

- I only got it in February, having played Pandemic Legacy whilst away with friends
- it’s the only game I have where being able to see everyone’s hand isn’t an issue
- perhaps most importantly, it's a good game!

We moved some of the card piles off of the board, to make space for everyones hands.

Emma and Chris connected their laptop to their TV, so they got a decent view of the board.

![Emma and Chris' remote view of the board](/img/playing-board-games-remotely/remote.jpg){.img--border}

However they couldn't quite make out all of the city names on the cards, and definitely not the city names on the board. They kept track of everyone's hands using old-fashioned paper and pen, and had a photo of the board open to refer to.

It also definitely helped that we'd played Pandemic with them before, so they already understood the rules and we didn't have to try and explain it all.

### Not got Pandemic, or don't want to play it?

There's definitely other games that will work with this setup, as long as players don't need to be able to draw cards that need to be kept secret. Co-operative games are likely to work best. Probably.

## The result

It generally seemed to work well, and Emma and Chris enjoyed it despite being remote (or, at least, they said they did…)

We won, and even managed to eradicate one of the diseases along the way – but with only three cards left to draw. A close one!

If you try this for yourself, do [let me know](https://twitter.com/36degrees) – especially if you find other games that work well!


[^1]: 'Fun' fact: we only bought this tripod a few weeks ago, for a trip to Tromsø we were meant to have gone on this week. At least we got some use out of it!
[^2]: When opening Camera Live for the first time, macOS may prevent you from running it as it's not trusted. You can work around this by right-clicking and choosing 'Open', but note that this is macOS trying to protect you from untrusted software, and you're choosing to bypass that protection.
[^3]: We didn't actually do this, which may explain why Emma and Chris couldn't read the cards – I only just spotted this setting whilst re-visiting it for the blog post. Unfortunately Google Meet is limited to 720p – if we try this again, we might try and find another provider that supports 1080p so that it's even easier to make out the board and the cards
