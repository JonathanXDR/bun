const { spawn, spawnSync } = require("child_process");

// Example demonstrating the use of maxBuffer in subprocess with spawn
async function runCommandWithMaxBuffer() {
  console.log("Running command with maxBuffer limit using spawn...");

  // Create a subprocess with a maxBuffer of 10 bytes
  // This means the stdout/stderr readers will only buffer up to 10 bytes
  const process = spawn("bun", ["-p", "console.log('This text is longer than the maxBuffer limit'); while(true) {}"], {
    maxBuffer: 10,
  });

  // Get the stdout as a ReadableStream
  const stdout = process.stdout;

  try {
    // Read the entire output as text
    const decoder = new TextDecoder();
    const chunks = [];

    for await (const chunk of stdout) {
      chunks.push(decoder.decode(chunk, { stream: true }));
    }
    chunks.push(decoder.decode()); // Final flush

    const output = chunks.join("");
    console.log("Command output:", output);
  } catch (error) {
    console.error("Error reading output:", error);
  }

  // Wait for process to exit
  const exitCode = await new Promise(resolve => {
    process.on("close", resolve);
  });

  console.log(`Process exited with code ${exitCode}`);
}

// Example demonstrating the use of maxBuffer in subprocess with spawnSync
function runCommandWithMaxBufferSync() {
  console.log("Running command with maxBuffer limit using spawnSync...");

  try {
    // Create a subprocess with a maxBuffer of 10 bytes
    // This will throw an error if the output exceeds maxBuffer
    const result = spawnSync("yes", ["This text is longer than the maxBuffer limit"], {
      maxBuffer: 10,
      encoding: "utf8",
    });

    if (result.error) {
      console.error("Error in spawnSync:", result.error);
    } else {
      console.log("Command output:", result.stdout);
      console.log(`Process exited with code ${result.status}`);
    }
  } catch (error) {
    console.error("Exception in spawnSync:", error);
  }
}

// // Run the examples
// runCommandWithMaxBuffer().catch(err => {
//   console.error("Async example failed:", err);
// });

// Run the sync example
runCommandWithMaxBufferSync();

/*

info: creating PipeReader with max_size: 10
  info: PosixBufferedReader setParent
info: creating PipeReader with max_size: 10
  info: PosixBufferedReader setParent
info: PipeReader start with max_size: 10
  info: PosixBufferedReader start
    info: PosixBufferedReader getFd
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader eventLoop
        info: BufferedReaderVTable eventLoop
          info: BufferedReaderVTable eventLoop_fn
            info: PipeReader eventLoop with max_size: 10
      info: PosixBufferedReader eventLoop
        info: BufferedReaderVTable eventLoop
          info: BufferedReaderVTable eventLoop_fn
            info: PipeReader eventLoop with max_size: 10
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PipeReader readAll with max_size: 10
  info: PosixBufferedReader buffer
  info: PosixBufferedReader getFd
  info: PosixBufferedReader getFileType
  info: BufferedReaderVTable isStreamingEnabled
  info: BufferedReaderVTable isStreamingEnabled
  info: PosixBufferedReader registerPoll
    info: PosixBufferedReader loop
      info: BufferedReaderVTable loop
        info: PipeReader loop with max_size: 10
info: PipeReader start with max_size: 10
  info: PosixBufferedReader start
    info: PosixBufferedReader getFd
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader eventLoop
        info: BufferedReaderVTable eventLoop
          info: BufferedReaderVTable eventLoop_fn
            info: PipeReader eventLoop with max_size: 10
      info: PosixBufferedReader eventLoop
        info: BufferedReaderVTable eventLoop
          info: BufferedReaderVTable eventLoop_fn
            info: PipeReader eventLoop with max_size: 10
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PipeReader readAll with max_size: 10
  info: PosixBufferedReader buffer
  info: PosixBufferedReader getFd
  info: PosixBufferedReader getFileType
  info: BufferedReaderVTable isStreamingEnabled
  info: BufferedReaderVTable isStreamingEnabled
  info: PosixBufferedReader registerPoll
    info: PosixBufferedReader loop
      info: BufferedReaderVTable loop
        info: PipeReader loop with max_size: 10
info: PipeReader hasPendingActivity with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PipeReader hasPendingActivity with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PosixBufferedReader buffer
info: PosixBufferedReader getFd
info: PosixBufferedReader getFileType
info: BufferedReaderVTable isStreamingEnabled
info: BufferedReaderVTable isStreamingEnabled
info: BufferedReaderVTable isStreamingEnabled
info: PosixBufferedReader registerPoll
  info: PosixBufferedReader loop
    info: BufferedReaderVTable loop
      info: PipeReader loop with max_size: 10
info: PipeReader hasPendingActivity with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PosixBufferedReader buffer
info: PosixBufferedReader getFd
info: PosixBufferedReader getFileType
info: BufferedReaderVTable isStreamingEnabled
info: PosixBufferedReader closeWithoutReporting
  info: PosixBufferedReader getFd
info: BufferedReaderVTable isStreamingEnabled
info: PosixBufferedReader done
  info: PosixBufferedReader finish
  info: BufferedReaderVTable onReaderDone
    info: PipeReader onReaderDone with max_size: 10
      info: PipeReader toOwnedSlice with max_size: 10
      info: PipeReader kind with max_size: 10
      info: PipeReader _deinit with max_size: 10
        info: PosixBufferedReader isDone
        info: PosixBufferedReader deinit
          info: PosixBufferedReader buffer
          info: PosixBufferedReader closeWithoutReporting
            info: PosixBufferedReader getFd
info: PipeReader hasPendingActivity with max_size: 10
info: PipeReader watch with max_size: 10
  info: PosixBufferedReader isDone
  info: PosixBufferedReader watch
    info: PosixBufferedReader registerPoll
      info: PosixBufferedReader loop
        info: BufferedReaderVTable loop
          info: PipeReader loop with max_size: 10
info: PosixBufferedReader buffer
info: PosixBufferedReader getFd
info: PosixBufferedReader getFileType
info: BufferedReaderVTable isStreamingEnabled
info: PosixBufferedReader closeWithoutReporting
  info: PosixBufferedReader getFd
info: BufferedReaderVTable isStreamingEnabled
info: PosixBufferedReader done
  info: PosixBufferedReader finish
  info: BufferedReaderVTable onReaderDone
    info: PipeReader onReaderDone with max_size: 10
      info: PipeReader toOwnedSlice with max_size: 10
      info: PipeReader kind with max_size: 10
      info: PipeReader _deinit with max_size: 10
        info: PosixBufferedReader isDone
        info: PosixBufferedReader deinit
          info: PosixBufferedReader buffer
          info: PosixBufferedReader closeWithoutReporting
            info: PosixBufferedReader getFd
Command output: This text is longer than the maxBuffer limit

*/
