# Java-Script-Project---Mr.Snake
# Snake Game

## Overview
This project is a classic Snake game implemented in JavaScript. The game features a dynamically generated grid where the snake moves, consumes food, and grows in length. The goal is to achieve the highest possible score without colliding with the walls or itself.

## Features
- **Grid-Based Movement:** The snake moves on a 20x20 grid, responding to arrow key inputs.
- **Food and Bonus System:**
  - Regular food increases the score by **5 points**.
  - Bonus food appears occasionally, granting **20 points** if collected within a limited time.
- **High Score Tracking:** The game stores previous scores in `localStorage` and displays the highest score achieved.
- **Game Over Handling:** Upon collision, the game redirects the player to a `gameover.html` page where they can retry or exit.
- **Login System:** Users must enter a valid username (**letters only**) before accessing the game.

## Code Strategy
### Game Initialization
- The game initializes by:
  - Creating a **table-based grid**.
  - Placing the first **food item**.
  - Setting up an **event listener** for movement input.
  - Running the game loop at a defined speed interval.

### Movement and Collision Detection
- The **snake moves** by updating its head position and shifting the body.
- The game ends if the snake collides with **walls** or **itself**.
- If **food** is consumed:
  - The score increases.
  - The snake grows.
  - A new food item is placed.
- **Bonus food** appears every **20 points** for a short duration.

### Score Management
- Scores are stored in `localStorage`, allowing **persistent high score tracking**.
- When the game ends:
  - The player's **score is saved**.
  - If a new high score is achieved, an **alert** notifies the player.

### Game Over Handling
- When the game ends, the player is redirected to `gameover.html`, where they can:
  - **Retry** the game.
  - **Exit** to an external website.

## How to Play
1. **Enter a valid username** and start the game.
2. **Use arrow keys** to control the snake's movement.
3. **Eat food** to grow and increase your score.
4. **Avoid collisions** with walls and yourself.
5. **Collect bonus food** for extra points.
6. **Try to set a new high score!**

## Future Enhancements
- Implement **different difficulty levels**.
- Add **sound effects and animations**.
- Enhance **UI design** for a better user experience.

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/MiryamMann/ava-Script-Project---Mr.Snake.git
   ```
2. Open `index.html` in a browser.
3. Enjoy the game!

