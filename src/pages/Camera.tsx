import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

export default function Camera() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState<ExpoCamera | null>(null);

    async function askForCameraPermission() {
        const { status } = await ExpoCamera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    if (hasPermission === null) {
        askForCameraPermission();
    }

    if (hasPermission === false) {
        return Alert.alert('Acesso negado');
    }

    const handleFlipCamera = () => {
        setType(
            type === CameraType.back
                ? CameraType.front
                : CameraType.back
        );
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync();
            console.log(data.uri);
            Alert.alert('Foto tirada com sucesso', 'Confira sua galeria');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ExpoCamera style={{ flex: 1 }} type={type} ref={ref => setCamera(ref)}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'flex-end',
                            marginBottom: 20

                        }}>
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 30,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: '#fff',
                                backgroundColor: '#fff',
                            }}
                        >
                            <TouchableOpacity
                                onPress={takePicture}
                                style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                }}
                            >
                                <Feather name="camera" size={30} color="#000" style={{ marginTop: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 30,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: '#fff',
                                backgroundColor: '#fff',
                                marginLeft: 20
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleFlipCamera}
                                style={{
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                }}
                            >
                                <Feather name="rotate-cw" size={30} color="#000" style={{ marginTop: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ExpoCamera>
        </View>
    );
}