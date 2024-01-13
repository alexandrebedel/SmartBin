import { exec as core_exec } from "node:child_process";
import util from "node:util";

export const exec = util.promisify(core_exec);
