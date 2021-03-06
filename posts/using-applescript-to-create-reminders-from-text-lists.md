---
title: Using AppleScript to create reminders from text lists
date: 2021-03-06
---

Last night as I was heading out to do some grocery shopping, I thought I'd try using the reminders app to keep track of our shopping list. I wanted to use the reminders app on my watch, so that I didn't have to keep getting my phone out and unlocking it[^1].

[^1]: The next version of iOS / watchOS [should make unlocking an iPhone whilst wearing a mask easier](https://www.macrumors.com/how-to/unlock-iphone-wearing-mask-with-apple-watch/) 🥳

However, our shopping list was in a note in the Notes app. I expected to be able to copy and paste the list into the Reminders app, but no – it just created a single reminder with the entire shopping list in it.

This is definitely something that _should_ just work, and it seems like a real oversight that it doesn't, but at least it gave me something to do on my Saturday afternoon…

I decided to try and use [Automator] to create a [Quick Action] to easily turn a text list into Reminders.

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 50px 0; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/9VU8_POShJo' frameborder='0' allowfullscreen></iframe></div>

If you want to use this Quick Action yourself, follow these steps:

1. In the Automator app on your mac, create a new Quick Action workflow.
2. In the settings for the quick action at the top of the main pane, set 'Workflow receives current' to 'text' in 'any application'.
3. Add a new 'Run AppleScript' action to the workflow, with the following script:
	```applescript
	on run {input, parameters}
		tell application "Reminders"
			-- bring to foreground
			activate
			
			-- ask which list to add to
			set allLists to name of every list
			set chosenList to (choose from list allLists with prompt "Select the list to add reminders to" without empty selection allowed)
			
			-- if the user presses cancel, abort
			if chosenList is false then return
			
			set chosenList to chosenList as string
			
			-- split input to workflow into paragraphs and add to chosen list
			repeat with lineOfText in paragraphs of (item 1 of input)
				set lineOfText to lineOfText as string
				if lineOfText is not equal to "" then
					tell list chosenList
						make new reminder at end ¬
							with properties {name:lineOfText}
					end tell
				end if
			end repeat
			
		end tell
	end run
	```
4. Save the workflow as 'Copy to Reminders'

With text selected in another application, you should now be able to right-click and select 'Copy to Reminders' from the 'Services' sub-menu, as shown in the video above.

If you've found this useful, please do [let me know](http://twitter.com/36degrees)!

[Automator]: https://support.apple.com/en-gb/guide/automator/welcome/mac
[Quick Action]: https://support.apple.com/en-gb/guide/automator/aut73234890a/mac
