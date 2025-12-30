export class Builtins {
  static exit(code: number) {
    process.exit(code);
  }

  static echo(args: string[]) {
    console.log(args.join(" "));
  }

  static notFound(command: string) {
    console.log(`${command}: command not found`);
  }
}
