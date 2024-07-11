DROP DATABASE IF EXISTS private_potty_party_db;
CREATE DATABASE private_potty_party_db;

\c private_potty_party_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isPublic BOOLEAN DEFAULT FALSE
);

CREATE TABLE restrooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0.0
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    restroom_id INTEGER NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    comment TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (restroom_id) REFERENCES restrooms (id)
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    restroom_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    nsfw BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (restroom_id) REFERENCES restrooms (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE emojis (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL,
    emoji_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews (id),
    FOREIGN KEY (emoji_id) REFERENCES emojis (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
