---
title: "Weeknotes: February 21"
date: 2021-02-21
---

## 5 things that happened

### 1. Proposed a change to the ARIA spec

Off the back of our team's [work around conditional reveals](https://github.com/alphagov/govuk-frontend/issues/1991), we raised [an issue on the ARIA repo to propose extending support for `aria-expanded` to radios](https://github.com/w3c/aria/issues/1404).

I'd like to see us doing more things like this going forward, where appropriate. We spend so much time trying to paper over the cracks in the various technologies the web is built on[^1]. It'd be good to invest time now to try and improve things for our future selves.

[^1]: For example, if you want to make an element visible only to screen readers you basically just [make it so tiny it's invisible](https://github.com/alphagov/govuk-frontend/blob/8748418071b7e753a2085b409d10e1c2fb40990e/src/govuk/helpers/_visually-hidden.scss#L5-L36). It's a massive hack, and it's fragile – see issues [#1032](https://github.com/alphagov/govuk-frontend/issues/1032) and [#1096](https://github.com/alphagov/govuk-frontend/issues/1096) and [#2117](https://github.com/alphagov/govuk-frontend/issues/2117) for examples.

      We'll likely need the hacks forever, for backwards compatibility, but [there should be a better, declarative way to do it going forward](https://github.com/w3c/css-a11y/issues/13).

### 2. Reported a couple of bugs

Whilst working on the cookie banner component we found that hiding the cookie banner in our review app would consistently crash the Safari WebKit process if you were using VoiceOver. This didn't happen in the prototype we'd built.

After a bit of investigation, we tracked it down to the `:before` pseudo-element on the `<body>` which [shows us the active breakpoint](https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint) – without the pseudo-element it didn't happen.

I also noticed that when the WebKit process crashes and the tab is reloaded, the notification that appears is not announced. This means that a VoiceOver user who can't see the screen would have no idea that the page had been reloaded, so we reported that too.

- [Crash when hiding focused element whilst using VoiceOver (SIGSEGV) if body has a fixed :before pseudo-element](https://bugs.webkit.org/show_bug.cgi?id=221888)
- [VoiceOver users are not notified if a page is reloaded because of a problem (Safari)](https://github.com/alphagov/reported-bugs/issues/57)

### 3. Tried to write some feedback

As end of year performance reviews beckon, I spent most of Friday trying to write feedback for my colleagues, and felt like I got nowhere with it.

Writing good feedback is hard. I think. Or I'm just overthinking everything. Or both.

(Also, we're living through a pandemic and everyone's literally locked down at home. My teammates are amazing – is _now_ really the right time to tell them that I think sometimes their commit messages could be better written?)

### 4. Started thinking about getting some sort of accessibility accreditation

I can't remember what triggered it, but this week I found myself looking into the [International Association of Accessibility Professionals](https://www.accessibilityassociation.org) and their [Web Accessibility Specialist certification](https://www.accessibilityassociation.org/wascertification).

Somewhat interested.

Chatted to a few people to try and get a feel for whether it's worth pursuing or not. I'm also thinking that there might be a few of us from GDS who might want to do it together.

### 5. Got some fresh air

Went for a walk on Saturday – a 5 mile circular from a local village.

Bits of it were exquisite – the fresh air, an invigorating breeze, the sun on your back; a deer bolting across our path. At one point we saw an ostrich.

![Tree](/img/weeknotes-2021-02-21/tree-bw.jpg){.img--border width=500}

Other bits involved trudging towards an infinite horizon, with half of the barren, claggy field stuck to your boots; eyes glued to the map on your phone trying to ensure that you pick up the footpath on the other side.

All the while, the voice in your head shouting ‘FUCK THIS FUCKING FIELD IN PARTICULAR’.

![Mud](/img/weeknotes-2021-02-21/mud.jpg){.img--border width=500}

So, a mixed success. Still, got some fresh air.
