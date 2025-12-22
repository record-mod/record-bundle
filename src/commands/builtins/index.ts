import { registerCommand } from "..";
import debug from "./debug";

export function initCommands() {
    registerCommand(debug);
}
