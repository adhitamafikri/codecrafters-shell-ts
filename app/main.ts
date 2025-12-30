import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question("$ ", (answer) => {
    if (answer.toLowerCase() === "exit") {
      process.exit(0);
    }
    console.log(`${answer}: command not found`);
    ask();
  });
}
ask();
