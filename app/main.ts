import { createInterface } from "node:readline";
import { execSync } from "node:child_process";
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
      } else if (command === "type") {
        const newCommand = args.shift();
        Builtins.type(newCommand || "");
      } else {
        try {
          const result = execSync(`${command} ${args.join(" ")}`)
            .toString()
            .trim();
          if (result) {
            console.log(result);
          }
        } catch {
          // just do nothing ATP
        }
      }
    }

    ask();
  });
}

function main() {
  ask();
}
main();
