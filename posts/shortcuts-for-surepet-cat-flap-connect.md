---
title: Shortcuts for SurePet Connected Cat/Pet Flaps
description: iOS Shortcuts you can use to control a SurePet Cat Flap Connect or Pet Flap Connect with Siri.
date: 2020-05-07
---

These iOS [Shortcuts] allow you to control a SureFlap [Cat Flap Connect] or [Pet Flap Connect] using Siri. You can use them to:

- find out whether your pets are inside or outside
- update your pet's location, for example if they enter or leave the house via a door or window

These shortcuts were created by me, and use the SurePet API which as far as I can tell is undocumented[^1]. I am not associated with SureFlap, other than being a happy customer.

They may well have bugs – at one point whilst creating these shortcuts SureFlap thought one of my cats went outside in the future.

Use them at your own risk.

[[toc]]


## Before you start

1. Install the [Shortcuts App] from the iOS App Store

1. [Enable 'Allow untrusted shortcuts' in the Shortcuts settings](https://support.apple.com/en-hk/HT210628)


## Connecting Shortcuts to SurePet

To start with, we're going to log in to SurePet using the email address and password for your SurePet account.

We'll then get a 'token' which we'll store so that Shortcuts can talk to SurePet without you having to log in every time.

1. Add the '[Log in to SurePet]' shortcut and run it.

1. Enter your email address and password when prompted.

   These are sent to SurePet to get the token, and are not stored anywhere. You should see 'Login successful – copied to clipboard'.

1. Add the '[SureFlap Token]' shortcut.

   When asked for the SureFlap token, paste the token which should still be on your clipboard from the previous step. It looks like a very long, random mix of letters, numbers and symbols.

You need to keep the 'SureFlap Token' shortcut for your shortcuts to work. Even though you won't run it directly, the other shortcuts rely on it.

You can delete the 'Log In To SurePet' shortcut, but you'll need to re-add it if you ever need to update your token.


## Set up a shortcut to find the location of your pets

1. Add the '[Where are The Cats?]' shortcut.

1. Run the shortcut to check that it works. You should hear something like:

   'Willow has been inside since 9 minutes ago. Hazel has been outside since 23 minutes ago.'

1. Try using Siri to run the shortcut, by asking 'Hey Siri, where are the cats?'

   If you want to use a different language, or your cats are actually dogs, rename the shortcut.

1. Bask in the glory of feeling like some sort of wizard 🧙🏻‍♂️


## Set up shortcuts to update the location for your pets (optional)

1. Add the '[Current Date UTC]' shortcut.

   (Whenever we tell SurePet where your pets have gone inside or outside, we have to tell them when that happened in [UTC]. Shortcuts doesn't have a built-in way to get the current date in UTC, so we have an  extra shortcut that we can use to work it out 🤦‍♂️)

1. Add the '[Set Pet Location]' shortcut.

1. Add and run the '[Get Pet IDs]' shortcut. You should see an alert that lists each of your pets and an ID, for example:

   ```
   Hazel: 12345
   Willow: 67890
   ```

   Write this down somewhere.

The 'Set Pet Location' shortcut you just added does the work of updating your pet's location, but you won't run it directly.
   
Instead, we'll create two new shortcuts for each of your pets – one to update their position to indoors, and one to update their position to outside.

For each pet:

1. Add the '[Pet Location Template]' shortcut. When prompted, enter the pet's ID from the previous step, and the location 'Inside'.

1. Rename the shortcut to, for example, 'Hazel Is Inside'.

1. Add the '[Pet Location Template]' shortcut again. Enter the pet's ID from the previous step, but this time use the location 'Outside'.

1. Rename the shortcut to, for example, 'Hazel Is Outside'.

You should now be able to say things like 'Hey Siri, Hazel is inside' or 'Hey Siri, Hazel is outside', and their location should update.

You need to keep the 'Current Date UTC' and 'Set Pet Location' shortcuts for these shortcuts to work. Even though you won't run them directly, the shortcuts that you've just created rely on them.

You can delete the 'Get Pet IDs' shortcut, but you may need to re-add it to add new pets, or if you accidentally delete a pet's shortcut and need to re-create it.


## Using Shortcuts with HomePod

You can use Shortcuts with HomePod, but they're linked to the Shortcuts library of whoever HomePod thinks is speaking.

If you want multiple users to be able to use the shortcuts, you'll need to make sure that [HomePod is configured to identify everyone](https://support.apple.com/en-gb/HT204753), and everyone will need to add the Shortcuts separately on their own device.


[Shortcuts]: https://support.apple.com/en-gb/HT208309
[Shortcuts App]: https://apps.apple.com/us/app/shortcuts/id915249334
[Cat Flap Connect]: https://www.surepetcare.com/en-gb/pet-doors/microchip-cat-flap-connect
[Pet Flap Connect]: https://www.surepetcare.com/en-gb/pet-doors/microchip-pet-door-connect
[UTC]: https://en.wikipedia.org/wiki/Coordinated_Universal_Time

[Log in to SurePet]: https://www.icloud.com/shortcuts/455b2a3b5a474232b171277ab8c943d0
[SureFlap Token]: https://www.icloud.com/shortcuts/1a2e9f25aa41442594929818f43d5545
[Where are The Cats?]: https://www.icloud.com/shortcuts/1e209e4a6e8d4529a47928755cc33517
[Current Date UTC]: https://www.icloud.com/shortcuts/969fef057bf54272b8295bdd249e6483
[Set Pet Location]: https://www.icloud.com/shortcuts/dcb6fe25a39d40c4a2509b8fef568faf
[Get Pet IDs]: https://www.icloud.com/shortcuts/71edeb81bea6489581f6831844bff26b
[Pet Location Template]: https://www.icloud.com/shortcuts/237f9b5f929a4454a7bb7b7fcba4fdec

[^1]: Thanks to Alex Toft for his research and the [example SureFlap code](https://github.com/alextoft/sureflap), which was a really valuable reference when creating these shortcuts.
