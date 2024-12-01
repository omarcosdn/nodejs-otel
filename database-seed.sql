create table post (
  id serial primary key,
  title varchar not null,
  body varchar not null,
  likes_count serial not null
);

INSERT INTO post VALUES (1, 'Welcome to the Blog', 'This is our first blog post welcoming all readers to the platform.', 25);

INSERT INTO post VALUES (2, 'Top 10 Travel Destinations', 'Explore the top 10 travel destinations for your next vacation.', 87);

INSERT INTO post VALUES (3, 'Understanding JavaScript Closures', 'A deep dive into closures in JavaScript and their applications.', 45);

INSERT INTO post VALUES (4, 'Healthy Recipes for the Week', 'Check out these 5 healthy and delicious recipes for your weekly meal prep.', 60);

INSERT INTO post VALUES (5, 'Breaking News: Tech Merger', 'Tech giants AlphaCorp and BetaInc announce a groundbreaking merger.', 120);
