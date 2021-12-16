# battleship-game

The main objective of this project was to familiarize with TDD, (Test Driven Development) can certainly feel uncomfortable at first, but becomes more natural with practive. To do this I decided to implement the game 'Battleship'. Simply take it one step at a time. Write a test, then make it pass.
Here are the two files, which I wanted to test:
- gameboard.js
- ship.js

These two files are factory functions, and in this project I will not test everything, just these two files.
To do this I used the [Jest JS](https://jestjs.io/) test framework.

## Description

This application had to meet several requirements, which are the following:
1. Begin my app by creating the Ship factory function.
  - 'Ships' will be objects that include their length, where they've been hit and wether or not they've been sunk.
  - Ships should be have a `hit()` function that takes a number and then marks that position as 'hit'


- [] polish the intelligence of computer by having it try adjacent slots after getting a hit
- [] letting users place their ships
