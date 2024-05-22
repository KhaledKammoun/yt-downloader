const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const app = express();
const port = 3001;
app.use(express.json());

app.post("/api/download", (req, res) => {
  const { videoId, resolution } = req.body;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const outputPath = path.join(
    __dirname,
    `downloads/${videoId}_${resolution}.mp4`
  );

  // Use yt-dlp to download the video
  const command = `C:\\youtube-dl\\yt-dlp.exe -f "best[height<=${resolution}]" ${videoUrl} -o ${outputPath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading video: ${error.message}`);
      return res.status(500).send("Error downloading video");
    }
    console.log("Download completed:", stdout);

    // Send the file path to the frontend
    res.json({ filePath: outputPath });
  });
});

app.get("/download", (req, res) => {
  const filePath = req.query.path;
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
