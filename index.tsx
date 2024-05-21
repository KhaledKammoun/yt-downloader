const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

// Define a route to handle video download
app.get("/download", async (req: any, res: any) => {
  try {
    const videoUrl = req.query.url; // Get the video URL from query params
    const videoInfo = await ytdl.getInfo(videoUrl); // Get video info

    // Set response headers for video download
    res.header(
      "Content-Disposition",
      `attachment; filename="${videoInfo.title}.mp4"`
    );
    res.header("Content-Type", "video/mp4");

    // Pipe the video stream to response
    ytdl(videoUrl, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Error downloading video");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
