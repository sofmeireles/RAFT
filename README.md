# Raft

**Summary**

This project, developed as a university assignment for a multimedia class in 2019/2020, aims to create a 2D game named "Raft" built with Phaser v3.22.0.

In "Raft", the main character, unjustly accused of stealing the Mona Lisa, must escape from an island where they are imprisoned. Players will navigate through various scenarios, solving puzzles involving Mathematics, Portuguese History, general knowledge, and more, to collect items necessary for building a raft and escaping the island.

<img width="626" alt="image" src="https://github.com/sofmeireles/RAFT/assets/50632953/202d8235-b833-407a-8ff4-26cf008e2473">

The game includes a timer to track how long it takes the player to complete the game and a counter for attempts. Each failed attempt, such as being attacked by a gorilla or a tiger, adds a 30-second penalty. Additionally, "Easter eggs" hidden throughout the game reduce the overall time by 15 seconds each when found. Players who finish the game in the shortest time will be ranked on a leaderboard accessible from the main menu.

<img width="481" alt="image" src="https://github.com/sofmeireles/RAFT/assets/50632953/0d1a8cb2-ca2f-44b7-b5d6-9729ef8b6d2d">


## Requirements

To run this project, you need:

* A web browser (preferably the latest version of Chrome, Firefox, or Edge)
* A web server (optional, but recommended for better performance)

## Installation and Running the Project

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sofmeireles/RAFT/
    cd RAFT/projeto
    ```

2. **Open the game:**

    You can use a local web server to run the game. You can use any web server of your choice. Here is an example using `http-server` which is a simple, zero-configuration command-line HTTP server:

    1. **Install `http-server` globally using npm:**

        ```bash
        npm install -g http-server
        ```

    2. **Run `http-server` in the project directory:**

        ```bash
        http-server
        ```

    3. **Open the provided URL in your web browser** (usually `http://localhost:8080/main.html`).

## Usage

* Navigate through the scenarios by moving the character with WASD keys.
* Solve various puzzles to collect wood items needed for building the raft.
* Avoid obstacles and enemies to escape the island.
* Discover "Easter eggs" to reduce your overall time.
* Try to complete the game in the shortest time to be ranked on the leaderboard.


## Acknowledgements

* This project was developed as a project for a multimedia class in 2019/2020.
