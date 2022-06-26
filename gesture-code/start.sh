#!/bin/sh
#BE SURE TO SOLDER THE jumpers PS and i2c pull up on the breakout board
sudo gpio edge 7 falling
build/apps/gesture 
