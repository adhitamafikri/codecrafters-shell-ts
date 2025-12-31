import { createInterface } from "node:readline";
import { spawn } from "node:child_process";
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
        const cps = spawn(`${command}`, args);
        cps.stdout.on("data", (data: Buffer) => {
          console.log("stdout data", data.toString().trim());
        });
        cps.on("error", () => {
          console.log(`${command}: command not found`);
        });
      }
    }

    ask();
  });
}

function main() {
  ask();
}
main();
