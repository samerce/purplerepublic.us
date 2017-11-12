import AudioContext from './AudioContext';
import autobind from 'autobind-decorator'

let analyser;
let audioCtx;
let mediaRecorder;
let chunks = [];
let startTime;
let stream;
let mediaOptions;
let blobObject;
let onStartCallback;
let onStopCallback;

const constraints = { audio: true, video: false }; // constraints - only audio needed

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

export class MicrophoneRecorder {
  constructor(onStart, onStop, options) {
    onStartCallback= onStart;
    onStopCallback= onStop;
    mediaOptions= options;
  }

  startRecording=() => {

    startTime = Date.now();

    if(mediaRecorder) {

      if(audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if(mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        return;
      }

      if(audioCtx && mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start(10);
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        if(onStartCallback) { onStartCallback() };
      }
    } else {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then((str) => {
          stream = str;

          if(MediaRecorder.isTypeSupported(mediaOptions.mimeType)) {
            mediaRecorder = new MediaRecorder(str, mediaOptions);
          } else {
            mediaRecorder = new MediaRecorder(str);
          }

          if(onStartCallback) { onStartCallback() };

          mediaRecorder.onstop = this.onStop;
          mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
          }

          audioCtx = AudioContext.getAudioContext();
          analyser = AudioContext.getAnalyser();

          mediaRecorder.start(10);

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

        });
      } else {
        console.warning('Your browser does not support audio recording');
      }
    }

  }

  pauseRecording() {
    if (mediaRecorder) {
      mediaRecorder.pause()
    }
    return this.createAudioBundle()
  }

  stopRecording() {
    if(mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      audioCtx.suspend();
    }
    return this.createAudioBundle()
  }

  @autobind
  onStop(evt) {
    const blobObject = this.createAudioBundle()
    chunks = [];
    if(onStopCallback) onStopCallback(blobObject)

  }

  createAudioBundle() {
    const blob = new Blob(chunks, { 'type' : mediaOptions.mimeType });
    return {
      blob      : blob,
      startTime : startTime,
      stopTime  : Date.now(),
      options   : mediaOptions,
      blobURL   : window.URL.createObjectURL(blob)
    }
  }

}