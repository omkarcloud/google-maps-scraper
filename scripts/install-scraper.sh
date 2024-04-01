#!/bin/bash
sudo apt install -y python3-pip
alias python=python3
python -m pip install bota
python -m bota install-scraper --repo-url https://github.com/omkarcloud/google-maps-scraper