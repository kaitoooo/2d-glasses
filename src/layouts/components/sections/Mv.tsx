import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { checkFace } from '../../modules/checkFace';

const Mv: React.VFC = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const selectFrameRef = useRef<HTMLSelectElement>(null);
    const selectColorRef = useRef<HTMLSelectElement>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const loadModels = async () => {
        const MODEL_URL = './models';
        await Promise.all([
            faceapi.nets.tinyFaceDetector.load(MODEL_URL),
            faceapi.nets.faceLandmark68Net.load(MODEL_URL),
            faceapi.nets.faceRecognitionNet.load(MODEL_URL),
            faceapi.nets.faceExpressionNet.load(MODEL_URL),
        ]);
    };

    const loadWaiting = async () => {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (webcamRef.current?.video?.readyState == 4) {
                    resolve(true);
                    clearInterval(timer);
                }
            }, 500);
        });
    };

    const faceDetected = async () => {
        await loadModels();
        await loadWaiting();
        if (webcamRef.current && canvasRef.current) {
            setIsLoaded(true);
            const webcam = webcamRef.current.video as HTMLVideoElement;
            const canvas = canvasRef.current;
            webcam.width = webcam.videoWidth;
            webcam.height = webcam.videoHeight;
            canvas.width = webcam.videoWidth;
            canvas.height = webcam.videoHeight;
            const video = webcamRef.current.video;
            (async function draw() {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
                if (detections.length > 0) {
                    checkFace(detections, canvasRef.current, selectFrameRef.current, selectColorRef.current);
                }
                requestAnimationFrame(draw);
            })();
        }
    };

    useEffect(() => {
        faceDetected();
    }, []);

    return (
        <>
            <section className="mv">
                <div className="mv__inner">
                    <div className="mv__video-area">
                        <div className="mv__camera">
                            <Webcam audio={false} ref={webcamRef} />
                        </div>
                        <div className="mv__canvas">
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                    <div className="mv__selects">
                        <div className="mv__select-frame">
                            <p className="mv__text mv__text--frame">フレーム</p>
                            <div className="mv__select-wrapper">
                                <select className="mv__select" defaultValue="wellington" ref={selectFrameRef}>
                                    <option value="wellington">ウェリントン</option>
                                    <option value="round">ラウンド</option>
                                    <option value="boston">ボストン</option>
                                    <option value="square">スクエア</option>
                                    <option value="oval">オーバル</option>
                                </select>
                            </div>
                        </div>
                        <div className="mv__select-color">
                            <p className="mv__text mv__text--color">カラー</p>
                            <div className="mv__select-wrapper">
                                <select className="mv__select" defaultValue="black" ref={selectColorRef}>
                                    <option value="black">ブラック</option>
                                    <option value="white">ホワイト</option>
                                    <option value="gray">グレー</option>
                                    <option value="brawn">ブラウン</option>
                                    <option value="red">レッド</option>
                                    <option value="orange">オレンジ</option>
                                    <option value="yellow">イエロー</option>
                                    <option value="blue">ブルー</option>
                                    <option value="green">グリーン</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="https://github.com/kaitoooo/2d-glasses" target="_blank" rel="noopener noreferrer" className="mv__link">
                    Git Hub
                </a>
            </section>
        </>
    );
};
export default Mv;
