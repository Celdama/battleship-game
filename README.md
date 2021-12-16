# battleship-game

The main objective of this project was to familiarize with TDD, (Test Driven Development) can certainly feel uncomfortable at first, but becomes more natural with practive. To do this I decided to implement the game 'Battleship'. Simply take it one step at a time. Write a test, then make it pass.
Here are the two files, which I wanted to test:
- gameboard.js
- ship.js

These two files are factory functions, and in this project I will not test everything, just these two files.
To do this I used the [Jest JS](https://jestjs.io/) test framework.

## Description

This application had to meet several requirements, which are the following:
1. Begin my app by creating the Ship factory function
  - 'Ships' will be objects that include their length, where they've been hit and wether or not they've been sunk.
  - Ships should be have a `hit()` function that takes a number and then marks that position as 'hit'
  - `isSunk()` should be a function that calculates it based on their length and whether all of their positions are 'hit'

2. Create Gameboard factory
  - Gameboard should be able to place ships at specific coordinates by calling the ship factory function.
  - Gameboards should have a `receiveAttack()` function that takes a pair of coordinates, determines whether or not the attach hit a ship and then send the `hit()` function to the correct ship, or records the coordinates of the missed shot.
  - Gameboards should keep track of missed attacks so they can display them properly.
  - Gameboards should be able to report whether or not all of their ships have been sunk.

3. Create Player
  - Players can take turns playing the game by attackings the ennemy Gameboard.
  - The game is played against the computer, so make ‘computer’ players capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal.

4. Create the main game loop and a module for DOM interaction
  - The game loop should set up a new game by creating Players and Gameboards.
  - You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
  - The game loop should step through the game turn by turn using only methods from other objects.
  - Create conditions so that the game ends once one players ships have all been sunk.

- [] polish the intelligence of computer by having it try adjacent slots after getting a hit
- [] letting users place their ships
