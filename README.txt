

## HTML,CSS

**Homepage:** 
Boilerplate via Ethereal by HTML5 UP, html5up.net | @ajlkn.  
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

**BB Realty** 
W3 template then heavily modified from previous homepage elements and googling

**Timezone page:**
Ripped off a youtube video I lost the link to, can't credit.  Then hacked at from there

**NixonBOT page:**
Randomly generated with ChaptGPT and google.  It's not particularly pleasing to the eyes

## Function
**Typescript, Javascript**
- Homepage contact form at the end triggers an email to my personal address via POST served by lambda function
- Timezones page utilized Time.now with timezones as well as functions for dragging and dropping
- Nixon Bot can add and remove terms and input forms via buttons.  Then search and replace of text string.
- BB Realty external website, service not within this repo.

## Server and Deployment
**Amazon Lambda Functions**
**Amazon SES for contact form automated Emailing
- Homepage contact form  POST served by lambda function, email triggered via SES
