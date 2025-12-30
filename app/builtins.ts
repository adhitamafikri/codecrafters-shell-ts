import { execSync } from "node:child_process";

export const commands = {
  exit: "exit",
  echo: "echo",
  type: "type",
} as const;
export type Commands = keyof typeof commands;

export class Builtins {
  static exit(code: number) {
    process.exit(code);
  }

  static echo(args: string[]) {
    if (args.length) {
      console.log(args.join(" "));
    }
  }

  static type(command: string) {
    if (!command) {
      return;
    }

    if (commands[command as Commands]) {
      console.log(`${command} is a shell builtin`);
      return;
    }

    try {
      const result = execSync(`which ${command}`).toString().trim();
      console.log(`${command} is ${result}`);
      return;
    } catch (error) {
      // Just do nothing ATP
    }

    console.log(`${command}: not found`);
  }

  static notFound(command: string) {
    console.log(`${command}: command not found`);
  }
}
