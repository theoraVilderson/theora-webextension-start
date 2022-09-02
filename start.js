const { spawn } = require("child_process");

// read command and run
const fs = require("fs");
let rawData = fs.readFileSync("package.json");
let packageJSON = JSON.parse(rawData);
const { webpack: webpackScript, hotReload: hotReloadScript } =
  packageJSON.scripts;

// all run commands
const commands = [
  {
    name: "hotReload",
    command: hotReloadScript,
  },
  {
    name: "webpack",
    command: webpackScript,
  },
];
let startCountLength = commands.length;
let startCount = 0;
let isReady = false;
const updateReadyCount = () => {
  if (isReady) return;
  const isDone = ++startCount >= startCountLength;

  if (!isDone) return;
  console.clear();
  console.log("Ready for Development");
};
function debounce(func, timeout = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const stdoutHandler = (name, item) => {
  let isReady = false;
  console.log("loading : ", name);
  item.on("error", (err) => {
    console.error(name + " : ", err, "Failed to start App.");
  });
  const func = debounce(() => {
    isReady = true;
    updateReadyCount();
  }, 400);
  item.stdout.on("data", (data) => {
    if (!isReady) {
      func();
      return;
    }
    console.log(name + " : ", data.toString());
  });
  item.stdout.on("error", (data) => {});
  item.stderr.on("data", (data) => {
    console.log(name + " : ", `stdoutError: ${data.toString()}`);
  });
};

try {
  console.clear();
  for (const command of commands) {
    const item = spawn(command.command, [], { shell: true });
    stdoutHandler(command.name, item);
  }
} catch (e) {
  console.error("Failed to start App", e);
}
