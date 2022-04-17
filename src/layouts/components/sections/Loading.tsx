import React from 'react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import BaseImage from '../common/BaseImage';

const Loading: React.VFC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const humanImgRef = useRef<HTMLDivElement>(null);
    const blackImgRef = useRef<HTMLDivElement>(null);
    const imgWrapperRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const textsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const animate = (): void => {
        const tl = gsap.timeline({
            defaults: {
                ease: 'power1.inOut',
            },
        });
        tl.to(humanImgRef.current, {
            className: 'loading__img loading__img--human is-active',
        });
        tl.to(imgWrapperRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
        });
        tl.to(
            blackImgRef.current,
            {
                className: 'loading__glasses-list is-active',
            },
            1.3
        );
        tl.to(
            blackImgRef.current,
            {
                className: 'loading__glasses-list is-active is-active2',
            },
            1.6
        );
        tl.to(
            blackImgRef.current,
            {
                className: 'loading__glasses-list is-active2 is-active3',
            },
            2.3
        );
        tl.to(
            blackImgRef.current,
            {
                className: 'loading__glasses-list is-active2 is-active3 is-active4',
            },
            2.9
        );
        tl.to(
            titleRef.current,
            {
                className: 'loading__title is-active',
            },
            3.5
        );
        tl.to(
            textsRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
            },
            3.8
        );
        tl.to(
            buttonRef.current,
            {
                opacity: 1,
                duration: 0.4,
            },
            3.8
        );

        tl.play();
    };
    const hidden = (): void => {
        gsap.to(wrapperRef.current, {
            autoAlpha: 0,
        });
    };
    useEffect(() => {
        animate();
    }, []);
    return (
        <section className="loading" ref={wrapperRef}>
            <div className="loading__inner">
                <h1 className="loading__title" ref={titleRef}>
                    Try Glasses
                </h1>
                <div className="loading__img loading__img--human" ref={humanImgRef}>
                    <BaseImage img={'human.png'} imgRetina={'human@2x.png'} role={'none'} width={993} height={1064}></BaseImage>
                </div>
                <div className="loading__glasses-wrapper" ref={imgWrapperRef}>
                    <div className="loading__glasses-list" ref={blackImgRef}>
                        <div className="loading__img loading__img--glasses">
                            <BaseImage img={'glass-black.png'} imgRetina={'glass-black@2x.png'} role={'none'} width={528} height={180}></BaseImage>
                        </div>
                        <div className="loading__img loading__img--glasses">
                            <BaseImage img={'glass-blue.png'} imgRetina={'glass-blue@2x.png'} role={'none'} width={560} height={215}></BaseImage>
                        </div>
                        <div className="loading__img loading__img--glasses">
                            <BaseImage img={'glass-brawn.png'} imgRetina={'glass-brawn@2x.png'} role={'none'} width={555} height={187}></BaseImage>
                        </div>
                        <div className="loading__img loading__img--glasses">
                            <BaseImage img={'glass-red.png'} imgRetina={'glass-red@2x.png'} role={'none'} width={525} height={173}></BaseImage>
                        </div>
                        <div className="loading__img loading__img--glasses">
                            <BaseImage img={'glass-yellow.png'} imgRetina={'glass-yellow@2x.png'} role={'none'} width={532} height={128}></BaseImage>
                        </div>
                    </div>
                </div>

                <div className="loading__texts" ref={textsRef}>
                    <p className="loading__text">
                        <span className="loading__text--big">Try Glasses とは</span>
                        ・あなたに似合うメガネフレーム、カラーを試すことができます。
                        <br />
                        ・このサイトはWebカメラが必須となります。
                        <br />
                        ・顔が近すぎる、マスク・メガネをつけていると顔を正常に判定できない場合があります。
                        <br />
                        ・Chrome、Safari推奨です。
                    </p>
                </div>
                <button className="loading__button" onClick={hidden} ref={buttonRef}>
                    <span className="loading__button--text">メガネを探す</span>
                </button>
            </div>
        </section>
    );
};

export default Loading;
