1.使用

Introduction

语音识别


Installation
Run npm install --save react-native-kdspeech

在application onCreate方法中:

  @Override
  public void onCreate() {
    super.onCreate();
    SpeechUtility.createUtility(this, "appid=" + getString(R.string.app_id));

  }
替换自己 app  android/app/res/values/appid 去官网申请appid

AndroidManifest.xml添加权限

    #<uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.INTERNET" />#


import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Platform,
    Button,
    DeviceEventEmitter,
    PermissionsAndroid
} from 'react-native'
//import SpeechModule from './SpeechModule'
import {SpeechModule} from 'react-native-kdspeech'

class Demo extends PureComponent {


    constructor(props: Object) {
        super(props)

        this.state = {
            resultText: '',
            permission: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        }
    }

    componentWillMount() {

        SpeechModule.addRecResultCallBack(this.onRecognizeResult)

    }


    componentWillUnMount() {
        SpeechModule.removeRecCallBack(this.onRecognizeResult);
    }

    onRecognizeResult = (e) => {
        console.log('result text: ' + e);
        this.setState({
            resultText: e,
        });

    }


    onPressButton(title) {


    }


    _requestPermission = async () => {
        let result = await PermissionsAndroid.request(
            this.state.permission
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
            SpeechModule.startSpeech();

        } else {
            this._requestPermission();
        }
    }

    onButtonClick() {
        if (Platform.OS === 'android') {
            this._checkPermission();
        }
    }

    _checkPermission = async () => {
        let result = await PermissionsAndroid.check(this.state.permission);
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
            SpeechModule.startSpeech();
        } else {
            this._requestPermission();
        }
    }

    onButtonClick_() {
        if (Platform.OS === 'android') {
            SpeechModule.stopSpeech();
        }
    }


    render() {
        return (

            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Text style={{flex: 1, backgroundColor: 'white',marginTop:10}}>
                    识别结果:{this.state.resultText}
                </Text>
                <View style={{flex: 1,marginTop:60}}>
                    <Button title="开启语音识别" onPress={this.onButtonClick.bind(this)}></Button>
                    <View style={{height:10}}></View>
                    <Button title="停止语音识别" color="#841584" onPress={this.onButtonClick_.bind(this)}></Button>
                </View>
            </View>
        );
    }

}

export default Demo;

