# Memory Game Project

## Download

* https://github.com/calebrice/fend-project-memory-game-master.git

## Usage

The purpose of this project is to create a matching game for a web browser. 16 cards are randomly shuffled at the start of each game. Two cards are clicked for each turn, if the two cards match, they will remain flipped, if not they will both turn back over. Each two clicks will increase the "move count" (which will affect final score) and the time it takes to match all of the cards wil be recorded for the final score as well.

There is a restart button that allows the game to be reset at any time.

## Bugs

I recently fixed a bug that occurs when the game is reset when one card is flipped. This would cause the first click of the new game to result one move with only one card clicked. If the card clicked in the new game matched the card in the previous, the card would count as a match.
