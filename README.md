1.使用
import  SpeechModule from '../Main/Component/SpeechModule'


componentWillMount() {
//增加语音识别结果回调，返回结果为 字符串。
SpeechModule.addRecResultCallBack(this.onRecognizeResult)

}

onRecognizeResult = (e)=> {
console.log('--------'+e);
}

在点击事件中控制语音状态：
     SpeechModule.startSpeech();//开启语音识别
      SpeechModule.stopSpeech();//停止语音识别

