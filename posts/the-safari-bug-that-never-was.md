---
title: The Safari bug that never was
date: 2022-12-23
---

In October 2021, Ian, a fellow frontend developer at GDS posted a message in our support channel for the GOV.UK Design System on Slack:{.paragraph--lead}

> "Just wondered if you were aware that the Safari Technology Preview is doing some quite strange things to the header, beta banner and buttons."

[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) is a version of the Safari browser designed to 'give an early look at upcoming web technologies in macOS and iOS'. Most browser vendors provide similar versions of their browsers that developers can use to test new features.

Prompted by Ian's message, we took a look at the Design System using Safari Technology Preview.

![Screenshot of the GOV.UK Design System homepage. The last word in the buttons in the cookie banner, the 'GOV.UK' logo and the beta banner all wrap on to a new line when they don't need to.](/img/the-safari-bug-that-never-was/screenshot.png)

We could see the strange things that Ian had mentioned happening in the header, the beta banner, and the buttons. The last word within each of these elements was wrapping on to a new line when it didn't need to.

Why getting the bug fixed was important
---------------------------------------

Safari's desktop market share is about 15%. Additionally, every browser on iOS, including Chrome, Edge and Firefox, uses the same browser engine that powers Safari, which is called WebKit.

So if this bug was to make its way out into a public release of iOS, GOV.UK would look like this for anyone using their iPhone or iPad to access the Internet as well as anyone using Safari on their Mac. About a third of all sessions on GOV.UK are from users on an iOS device.

Understanding the bug
---------------------

We wanted to report this bug to the WebKit team. To do that, we needed to be able to give a good explanation of what it was we were seeing and the conditions that were required for the bug to occur.

We could have just raised a bug that said 'Some quite strange things are happening to the header, beta banner and buttons on GOV.UK in Safari Technology Preview'.

However, we knew from our own experience dealing with bug reports that providing a really clear description of the bug would make it easier for the WebKit team to understand the problem, making it more likely that the bug would be fixed quickly.

'Text wraps unnecessarily' seemed like a good start -- but, strangely, we were only seeing this issue occur on GOV.UK. Other websites, including the NHS website [which re-uses quite a lot of our frontend code](https://gds.blog.gov.uk/2019/06/04/guest-post-adapting-the-gov-uk-design-system-for-the-nhs/), looked fine.

Through a trial-and-error approach -- disabling individual features one at a time -- we found that there was something about the font that we use that was causing this issue to occur. Changing the font to Arial made the problem go away.

![A screenshot of a set of checkboxes asking a user for their nationality. The legend has the text 'What is your nationality?'. The word 'nationality' wraps on to a new line when it doesn't need to. One of the checkboxes has the label 'Citizen of a different country', and 'country' also wraps on to a new line. Under the checkboxes is a details element with the text 'Help with nationality', and 'nationality' again wraps on to a new line. However, some of the checkboxes have hint text which does not wrap on to a new line.](/img/the-safari-bug-that-never-was/checkboxes.png){.img--border}

But even then, it wasn't happening everywhere -- when we looked at a set of checkboxes the text was wrapping unnecessarily within the legend, the labels for each checkbox and the details element, but not within the hint text.

We realised that it was happening when elements were intrinsically-sized or 'shrink-wrapped'. This is when the size of an element is dictated by its content. For example, the size of a button changes to fit the text within it.

So, 'text wraps unnecessarily within intrinsically-sized elements when using certain fonts'?

We thought this was a good description of the problem, but when we tried to create a minimal example we found that there was another thing that needed to be true for the issue to occur.

In HTML, any extra whitespace between words is ignored. This means you can add extra spaces, and even new lines, between words without affecting how they are displayed in the browser.

The bug only occurred if there was a new line somewhere in the HTML for that element.

We'd managed to get from 'some quite strange things are happening to the header, beta banner and buttons' to 'text wraps unnecessarily within intrinsically-sized elements when using certain fonts and the inner HTML of the element contains a new line that is not preceded by a space'.

Reporting the bug
-----------------

Once we had a good understanding of the conditions required to trigger the bug, we [reported it to the WebKit team](https://bugs.webkit.org/show_bug.cgi?id=232939) on November 10th last year.

We included links to pages where the issue was occurring, the version of Safari Technology Preview where we believe the issue had been introduced, and a minimal test case that demonstrated the bug.

A few days later a WebKit engineer responded to our bug report, saying "This is a really bad bug and we should fix it immediately."

After some investigation, they made [a change to WebKit](https://bugs.webkit.org/attachment.cgi?id=448463&action=prettypatch) that fixed the bug, and also added a test to prevent the bug from happening again.

By January 6th the change had been approved and merged, and was then included in Safari Technology Preview 139 which was released on 26th January.

What caused the bug
-------------------

You might be wondering what had caused the bug to occur in the first place.

We certainly were, and so we asked the engineer from the Webkit team who fixed the bug if he could come and talk to the frontend community at GDS about it, which he very kindly agreed to do.

He explained that they had been refactoring some of the code responsible for laying out text on the page.

In order for WebKit to lay out the text on the page, it needs to measure the width of the text. To do this, it uses data from the font to find out the width of each character.

![An illustration of the word 'Hello' with the width of each character shown under every character, including a trailing space and new line character.](/img/the-safari-bug-that-never-was/char-widths.png){.img--border}

This includes the width of whitespace characters, like spaces.

The font also has data about the [newline character](https://en.wikipedia.org/wiki/Newline), including its width. This doesn't really make sense -- new lines don't (or at least shouldn't) take up any space, but the font doesn't treat it differently to any other character. The creator of the font still has to include a width for the new line character in the font's data.

And in the font we use on GOV.UK, the new line character has a bigger width than a space character -- which is apparently unusual.

The code to lay out text for intrinsically-wrapped elements has two steps -- first, it measures the size of the text and uses that size to place boxes in the page layout.

Then, as a separate step, it puts the text into those boxes.

It's important that these two steps both agree on the width of the text.

This bug occurred because the two steps stopped agreeing.

![The phrase 'Hello world' annotated with two different widths. The width from step 1 is 'a number', and the width from step 2 is 'a different, slightly bigger number'.](/img/the-safari-bug-that-never-was/two-widths.png){.img--border}

One of them incorrectly used the width of the new line character in its calculations, and so the box that it made was too small.

![The phrase 'Hello world' annotated with a box with the smaller width from step 1, showing that the text does not fit in to the box and so ends up wrapping on to a new line.](/img/the-safari-bug-that-never-was/wrapping.png){.img--border}

Then in step 2, when WebKit tried to put the text into the box it had just created, it found that it didn't fit and so, the last word ended up forced on to a new line.

We don't routinely test with Safari Technology Preview or other 'beta' versions of browsers, so it was pure luck that Ian happened to use it to test something else.

As far as we know, we were the only people to report this bug. If Ian hadn't taken the time to let us know about this in our support channel, or if we hadn't taken the time to investigate and report it, there's a high chance that it could have made its way into public releases of Safari and iOS.

This isn't the only bug that we've reported. We've reported over 70 bugs to different browser and assistive tech vendors over the last few years, which we try to keep track of using [this GitHub project](https://github.com/orgs/alphagov/projects/34).

Reporting bugs to browser vendors is a great way to help make the web platform better. You can [learn more about filing good browser bugs in this article from web.dev](https://web.dev/how-to-file-a-good-bug/).
