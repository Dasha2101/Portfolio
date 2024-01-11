import { questions } from "./pages/data.mjs";
import { Hangman } from "./pages/Hangman.mjs";

const body = document.body
const game = new Hangman(body, questions);
