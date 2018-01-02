
import {NativeModules,DeviceEventEmitter,Platform} from 'react-native'

//导入Android原生模块
var speechModule = NativeModules.SpeechModule;
// create a component

    var SpeechModule = {
        //开启语音
        startSpeech() {
            if (Platform.OS === 'android') {
                speechModule.startSpeak();
            }
        },
        //语音识别结果 回调
        addRecResultCallBack(callBack) {
            if (Platform.OS === 'android') {
                DeviceEventEmitter.addListener('onRecResult', (result) => {
                    if (callBack) {
                        callBack(result);
                    }
                })

            }
        },
        removeRecCallBack(callBack){
            if (Platform.OS === 'android') {
                DeviceEventEmitter.removeListener('onRecResult',callBack)

            }
        },
        //停止语音
        stopSpeech() {
            if (Platform.OS === 'android') {
                speechModule.stopSpeak();
            }
        }
    }

export default SpeechModule;