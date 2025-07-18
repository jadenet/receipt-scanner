import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";
import { addToReceiptList } from "@/components/ReceiptList";

export default function Camera() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );

  function savePicture(photo: any) {
    // TODO: redirect to gallery page - possible zoom into photo

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
        onPictureSaved: savePicture
      });
    }
  };

  // TODO: fix camera crash

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={false} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
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
