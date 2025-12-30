import { createInterface } from "readline";
import { Builtins } from "./builtins";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question("$ ", (answer) => {
    if (answer.length > 0) {
      const [command, ...args] = answer.split(" ");
      if (answer.toLowerCase() === "exit") {
        Builtins.exit(0);
      } else if (command === "echo") {
        Builtins.echo(args);
      } else {
        Builtins.notFound(command);
      }
    }

    ask();
  });
}

function main() {
  ask();
}
main();
