# Prosocial Lab Website
This repository contains the codebase of Prosocial Lab website

## Adding contents

> Note: Be careful to indent properly while adding your contents into `.yml` file

### Adding a member
1. Save you photo (200px*200px .jpg file recommended) in `/assets/images/people/`
2. Go to `/_data/people.yml` file
3. Add your name, email address, filename of your photo (from step 1 - e.g., "donghoon.jpg"), starting year of your degree, and your website url (if applicable) under your role (faculty, phd, masters, or intern)

### Adding an alumni member
1. Go to `/_data/alumni.yml` file
2. Add your name, affiliation, role (of your current affiliation), end of your degree, and your website url (if applicable) under your previous role (faculty, phd, masters, or intern)

### Adding a publication
1. Save publication pdf in `/assets/pdf/publications/` (and slides, if applicable)
2. Go to `/_data/publication.yml` file
3. Add its title, authors, filename of the pdf (from step 1), category (one among `Behavior change`, `CAs`, `Reflection`, and `Transitional research` - case sensitive), and any additional materials (slide: put its filename here, presentation video: put its YouTube link)

### Adding a research area
1. Save relevant image in `/assets/images/research_area/`
2. Go to `/_data/research-area.yml` file
3. Add its title, description, and filename of the image (from step 1). Note that main page only shows up first four areas

## Test & Deploy

### Run locally
0. Make sure you have Jekyll environment ready - if you haven't, run `gem install bundler`
1. Go to the project directory and run `bundle exec jekyll serve`


### How to sync the data you just updated
1. Push every change you just made!
2. It will be live normally within 5 minutes


## Contact

AAA@BBB.com
