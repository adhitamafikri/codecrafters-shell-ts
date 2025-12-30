import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question("$ ", (answer) => {
    console.log(`${answer}: command not found`);
    ask();
    // rl.close();
  });
}
ask();
