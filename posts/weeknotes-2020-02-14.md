---
title: "Weeknotes: February 14"
date: 2021-02-14
---

Jumping on the weeknotes bandwagon, because why not. I mean, it passes the time, doesn't it?{.paragraph--lead}

## Monday

Shipped [a new version of GOV.UK Frontend](https://github.com/alphagov/govuk-frontend/releases/tag/v3.11.0).

The headline feature was a new [cookie banner component](https://design-system.service.gov.uk/components/cookie-banner/), which was a challenging component to build. We needed to try and work out how to support both server-side and client-side implementations, and after testing there were some difficult 'least-worst option' decisions to make around accessibility. Many of the things we were bumping up against really felt like they should be solved problems by now.

Found some other interesting bugs whilst we were testing, including one which consistently made the WebKit process crash in Safari – something to try and report next week.

Two other interesting things in the release worth calling out:

- a [fix to stop a service's session cookies being wiped when opening the print dialog in IE](https://github.com/alphagov/govuk-frontend/pull/2045) – one of those 🤯 bugs that honestly I'm impressed they got to the bottom of
- an [update to the character component to use tabular numbers for the remaining character count](https://github.com/alphagov/govuk-frontend/pull/2092) – I am here for this kind of attention to detail and I love it

## Tuesday

We recently did a 'satisfaction survey' for the Design System and Rosie, our user researcher, played back the results. I know we're going to play it back to the community soon, but I think the thing that I took away from it was that folks really just want us to do more and do it faster.

I've got no idea how to make that happen, and if I think about it for too long I just start feeling waaay out of my depth.

We ran a threat modelling workshop for our team with the help of the cyber security team. It was interesting, but felt a bit too much like a conversation between me and the security team whilst the rest of the team listened. Need to work out how to make the next couple of sessions work better for everyone.

## Wednesday

Our team are looking at accessibility issues with conditional reveals. I played back an overview of the issues and then we had an ideation session.

Felt like I got minor whiplash trying to go straight from cookie banner to threat modelling and now this.

A few of us spent an hour playing ['Welcome To' on Board Games Arena](https://en.boardgamearena.com/gamepanel?game=welcometo) after work. It was nice to do something a bit different, and by the end of it I reckon I knew at least 25% of the rules… looking forward to a rematch at some point.

## Thursday

Back to back meetings.

Not sure if that really is all there is to say, or if I'm just getting bored of writing weeknotes now.

## Friday

Took the day off.

Nearly considered un-taking it off, because I feel like I only added to my to-do list this week, and Fridays are usually one of the quieter days and an opportunity to catch up on things. Looking at my calendar, there are a few less busy days next week. I just hope they stay that way.

Glad I did take it off in the end. Had a bit of a lie in, and went for a walk. Our usual walking spots have got so busy at the weekends, it's nice to get out whilst it's a bit quieter.

Second takeaway of the week[^1], and Captain America: Civil War[^2].

## Saturday

Did a couple of workouts on Apple Fitness Plus. Trying to get into some sort of routine and to stay healthy, but it's just not quite sticking. Mum got an Apple Watch for Christmas and is now doing workouts most days, which puts me to shame but also makes me very happy.

Grocery shop. Even when we go in the evening when it's quite, I still find it a stressful experience that leaves me feeling physically tense.

Picked up plenty of desserts to try and compensate.

## Sunday

Another [game of Pandemic with friends](/posts/playing-board-games-remotely-with-friends/). We won with only a couple of moves to spare, which seems to be the way most of our games go now.

Dinner from the slow cooker. Happy Valentine's Day, us from this morning. We appreciate you.

Wrote these words. Not sure if this is really a weeknote or not. Feels more like a diary. Does it matter? Probably not. I'll probably try a few different styles on, see what fits.

[^1]: Battered sausage and chips. Slight remorse that I didn't change my order. Their battered halloumi buttie is excellent, but I just felt like I'd had it too much recently…

      (Oh, and the first takeaway was Dominos, on Tuesday)

[^2]: We're making our way through the back catalogue of Marvel films we haven't seen (which is most of them) after we reached episode 4 of WandaVision and got the feeling we were meant to understand more than we were…
