import { addToReceiptList } from "@/components/ReceiptList";
import { CameraView, useCameraPermissions } from "expo-camera";
import { isLoading } from "expo-font";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Camera() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function savePicture(photo: any) {
    const newReceipt = {
      uri: photo.uri,
      date: Date.now(),
      items: [],
    };
    addToReceiptList(newReceipt);
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      await cameraRef.current.takePictureAsync({
        shutterSound: false,
        onPictureSaved: savePicture,
      });
    }
  };

  if (!cameraRef.current) {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
          onCameraReady={() => {
            setLoading(false);
            console.log("here");
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
