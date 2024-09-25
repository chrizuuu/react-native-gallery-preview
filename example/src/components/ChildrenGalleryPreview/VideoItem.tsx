import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const VideoItem = () => {
  const { width } = useWindowDimensions();
  const player = useVideoPlayer(videoSource, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.play();
  });

  return (
    <VideoView
      style={[styles.video, { width }]}
      player={player}
      allowsFullscreen
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  video: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
