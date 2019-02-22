---
title: "Inclusive forms: Anatomy of a (fictional) GOV.UK service"
description: References for my talk on inclusive forms on GOV.UK at the London Accessibility meetup.
date: 2019-02-22
---

Last night I spoke for the first time at the [London Accessibility Meetup](https://www.meetup.com/London-Accessibility-Meetup/).{.paragraph--lead}

I talked about how we build inclusive online forms across government, using a fictional GOV.UK service as an example.{.paragraph--lead}

To those who weren't able to make it, the talk is [available on YouTube](https://www.youtube.com/watch?v=HJshEsMH_tg).

In putting it together I found myself pulling together information from _loads_ of different blog posts, previous talks, and from pull requests and issues from GitHub.

This is an attempt to link out to all of those things, for anyone that wants to find out more.

Have I missed something out here? Feel free to [edit this post on GitHub and raise a pull request](https://github.com/36degrees/obyford.com/blob/master/posts/inclusive-forms.md).

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 50px 0; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/HJshEsMH_tg?start=244' frameborder='0' allowfullscreen></iframe></div>

[[toc]]

## Introduction

- ['It doesn't have to be perfect – we just have to make it a little better than we did yesterday'](https://youtu.be/spxT2CmHoPk?t=2361) – Léonie Watson, Technologic (Human After All): Accessibility remix, ffconf 2016

## 1. Start Page

### Naming your service using verbs, not nouns

- [Good services are verbs, bad services are nouns](https://designnotes.blog.gov.uk/2015/06/22/good-services-are-verbs-2/) – Louise Downe, design in government blog, June 2015
- [Naming your service](https://www.gov.uk/service-manual/design/naming-your-service) – GOV.UK Service Manual, October 2016
- ['So what to call it is the most important conversation you can have about a service'](https://twitter.com/tjrdoyle/status/750683452303937536) – Stephen Gill (via Trisha Doyle, Twitter), July 2016

### Conveying page structure using headings

- [Web accessibility tutorial on headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- [Technique: Using h1-h6 to identify headings](https://www.w3.org/WAI/WCAG21/Techniques/html/H42) – WCAG 2.1

### Ensuring that links that look like buttons behave like buttons

- [Discussion about removing the button role from the link](https://github.com/alphagov/govuk_elements/pull/272) – GitHub issue on GOV.UK Elements, July 2016
- [ARIA: button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) – MDN web docs
- [JavaScript used to trigger button click event when the spacebar is pressed](https://github.com/alphagov/govuk-frontend/blob/e81a0fd1df51466edfb59976596da4a5179fda9c/src/components/button/button.js) – GOV.UK Frontend
- [Contribution to add `draggable="false"` to buttons in response to user research](https://github.com/alphagov/govuk-frontend/pull/1020) – Chris Hill-Scott, GOV.UK Frontend, October 2018
- [Button](https://design-system.service.gov.uk/components/button/) – GOV.UK Design System

### Clear and consistent focus states

- [Understanding Success Criterion 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) – Understanding WCAG 2.1
- [Understanding Success Criterion 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast) – Understanding WCAG 2.1
- [GOV.UK's current focus state](https://contrast-checker.glitch.me/?textColour=%230b0c0c&objectBackground=%23ffbf47&pageBackground=%23FFFFFF) –  checked using Nick Colley's contrast checker app
- [Investigate colour contrast issues with the focus state](https://github.com/alphagov/govuk-frontend/issues/1137) – GitHub issue on GOV.UK Frontend, January 2019

## 2. Have you held a juggling licence before?

### Supporting users who change colours in their browser

- [CSS Triangles](https://css-tricks.com/snippets/css/css-triangle/) – Chris Coyier, CSS Tricks, October 2009
- [Accessibility and me: Marian Foley](https://accessibility.blog.gov.uk/2016/05/26/accessibility-and-me-marian-foley/) – Marian Foley, accessibility in government blog, May 2016
- [How users change colours on websites](https://accessibility.blog.gov.uk/2017/03/27/how-users-change-colours-on-websites/) – Anika Henke, accessibility in government blog, March 2017
- [Supporting users who change colours on GOV.UK](https://accessibility.blog.gov.uk/2018/08/01/supporting-users-who-change-colours-on-gov-uk/) – Nick Colley, accessibility in government blog, August 2018
- [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) – MDN web docs
- [Investigate customised colours in IE11 / Edge](https://github.com/alphagov/govuk-frontend/issues/937) – GitHub issue on GOV.UK Frontend, August 2018

### Start with one thing per page

- [One thing per page](https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/) – Tim Paul, design in government blog, July 2015
- [Structuring forms](https://www.gov.uk/service-manual/design/form-structure) – GOV.UK Service Manual, December 2016
- [Question pages](https://design-system.service.gov.uk/patterns/question-pages/) – GOV.UK Design System

### Making a legend a heading

- [Pull request to de-duplicate legends/headings](https://github.com/alphagov/govuk_elements/pull/507) – Anika Henke, June 2017

### Custom radio buttons and checkboxes

- [Making radio buttons and checkboxes easier to use](https://gdstechnology.blog.gov.uk/2015/08/27/making-radio-buttons-and-checkboxes-easier-to-use/) – Robin Whittleton, technology in government blog, August 2015
- [Discussion about GOV.UK Verify style radios and checkboxes](https://github.com/alphagov/govuk_elements/pull/194) – Gemma Leigh, March 2016
- [Pull request to add custom radios / checkboxes to GOV.UK Elements](https://github.com/alphagov/govuk_elements/pull/296) – Robin Whittleton, August 2016
- [Checkboxes](https://design-system.service.gov.uk/components/checkboxes/) – GOV.UK Design System
- [Radios](https://design-system.service.gov.uk/components/radios/) – GOV.UK Design System

## 3. Previous licence details

### Form layout

- [Form elements](http://govuk-elements.herokuapp.com/form-elements/) – GOV.UK Elements

### Asking for dates

- [Asking for a date of birth](https://designnotes.blog.gov.uk/2013/12/05/asking-for-a-date-of-birth/) – Joe Lanman, design in government blog, December 2013)
- [Ask users for dates](https://design-system.service.gov.uk/patterns/dates/) – GOV.UK Design System

### Helping users understand when there is a problem

- [How we’ve made GOV.UK Elements even more accessible](https://accessibility.blog.gov.uk/2018/02/28/how-weve-made-gov-uk-elements-even-more-accessible/) – Anika Henke, accessibility in government blog, February 2018
- [Pull request to change the error summary ARIA role to 'alert'](https://github.com/alphagov/govuk_elements/pull/511) – Anika Henke, June 2017
- [Pull request to add 'Error:' to the page title when there is an error](https://github.com/alphagov/govuk_elements/pull/509) – Anika Henke, June 2017
- [Error summary](https://design-system.service.gov.uk/components/error-summary/) – GOV.UK Design System

### Linking from the error summary to different fields

- [Discussion about the error summary component in the community backlog](https://github.com/alphagov/govuk-design-system-backlog/issues/46)
- [Results of testing different options with assistive technologies](https://36degrees.github.io/linking-to-form-inputs/results/) ([test case](https://36degrees.github.io/linking-to-form-inputs/))
- [Pull request to add guidance on linking from the error summary](https://github.com/alphagov/govuk-design-system/pull/634) – Oliver Byford, November 2018
- [Pull request to scroll to the label or legend when linked from the error summary](https://github.com/alphagov/govuk-frontend/pull/1056) – Oliver Byford, November 2018

### Associating the error message with the input

- [No semantics to distinguish labels, hint texts and error messages](https://github.com/alphagov/govuk_elements/issues/574) – GitHub issue on GOV.UK Elements, November 2017
- [Pull request to move the error message out of the label legend, and associate using `aria-describedby`](https://github.com/alphagov/govuk-frontend/pull/681) – Alex Jurubita, May 2018
- [Error message](https://design-system.service.gov.uk/components/error-message/) – GOV.UK Design System

## 4. What is your most impressive juggling trick?

### Making a legend a label

- [Making labels and legends headings](https://design-system.service.gov.uk/get-started/labels-legends-headings/) - GOV.UK Design System
- [Consider adding headings to allowed content in `<label>` element](https://github.com/w3c/html/issues/1270) – Oliver Byford, HTML specification (w3c), March 2018
- [Pull request to allow headings within label elements (rejected)](https://github.com/w3c/html/pull/1304) – Oliver Byford, HTML specification (w3c), March 2018
- [Pull request to better define relationship between headings, error message and hints](https://github.com/alphagov/govuk-frontend/pull/684) – Oliver Byford, May 2018

### Providing feedback using a character count

- [Building Accessible Components and the GOV.UK Design System](https://youtu.be/wprWuTvhec4) –  Alice Noakes, Ed Horsford & Alex Jurubita, London Accessibility Meetup #13, April 2018
- [Character count prototype](https://github.com/alphagov/ds-character-count)
- [Pull request to add character count component](https://github.com/alphagov/govuk-frontend/pull/959) – Alex Jurubita, August 2018
- [Character count](https://design-system.service.gov.uk/components/character-count/) – GOV.UK Design System

## 5. Check your answers

- [Pull request to add the summary list component](https://github.com/alphagov/govuk-frontend/pull/1065) – Dave House & Nick Colley, November 2018
- [Pull request to add 'check your answers' page to the Prototype Kit](https://github.com/alphagov/govuk-prototype-kit/pull/36) – Rebecca Cottrell, October 2015
- [Help users to check answers](https://design-system.service.gov.uk/patterns/check-answers/)– GOV.UK Design System

## 6. Confirmation page

- [Pull request with fixes for components with overriden colours](https://github.com/alphagov/govuk-frontend/pull/377) – Oliver Byford, December 2017
- [Supporting users who change colours on GOV.UK](https://accessibility.blog.gov.uk/2018/08/01/supporting-users-who-change-colours-on-gov-uk/) – Nick Colley, accessibility in government blog, August 2018
- [Confirmation pages](https://design-system.service.gov.uk/patterns/confirmation-pages/) – GOV.UK Design System

## General links

- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [GOV.UK Service Manual](https://www.gov.uk/service-manual)
- [GitHub: GOV.UK Frontend repository](https://github.com/alphagov/govuk-frontend)
- [GitHub: GOV.UK Design System repository](https://github.com/alphagov/govuk-design-system)
- [GitHub: Community backlog](https://github.com/alphagov/govuk-design-system-backlog)


*[WCAG]: Web Content Accessibility Guidelines
