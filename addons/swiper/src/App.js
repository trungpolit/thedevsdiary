import React, {Fragment, useState} from 'react';
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {Splide, SplideSlide} from '@splidejs/react-splide';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import '@splidejs/react-splide/css/sea-green';
import './App.css';

import noimage from './no-image.webp';

const queryClient = new QueryClient();
const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });
persistQueryClient({
    queryClient,
    persister: localStoragePersister,
});

const FEED_KEY = 'feeds';
const FEED_URL = 'https://pub-9b8681f8055a4b3bbac9c4f748518548.r2.dev/architecture-weekly.json';
const SWIPER_HEIGHT = '260px';
const IMAGE_HEIGHT = '11em';

function Image({src, alt, style, ...props}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <Fragment>
            {loaded ? null : (
                <Skeleton height={IMAGE_HEIGHT}/>
            )}
            <img
                src={src}
                alt={alt}
                {...props}
                style={{display: "none"}}
                onLoad={({currentTarget}) => {
                    setLoaded(true)
                    currentTarget.style.display = "block";
                    currentTarget.style.height = style.height;
                    currentTarget.style.width = style.width;
                }}
                onError={({currentTarget}) => {
                    setLoaded(true);
                    currentTarget.onerror = null;
                    currentTarget.src = noimage;
                    currentTarget.style.display = "block";
                    currentTarget.style.height = style.height;
                    currentTarget.style.width = style.width;
                }}
            />
        </Fragment>
    )
}

function WeeklyFeedSwiper() {
    const {isLoading, error, data} = useQuery([FEED_KEY], () =>
            fetch(FEED_URL).then(async res => {
                    // await new Promise(r => setTimeout(r, 5000));
                    return res.json();
                }
            ), {
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    );


    if (isLoading) return <Skeleton count={1} height={SWIPER_HEIGHT}/>

    if (error) return 'An error has occurred: ' + error.message

    const {cover = {}, feeds = []} = data;
    const items = [
        {
            content: cover.content,
            title: cover.img.alt,
            thumb: cover.img.src,
        },
        ...feeds.map(({content, thumb, title, url}) => {
            return {
                content,
                title,
                thumb,
                url,
            }
        })
    ];

    return (
        <Splide
            aria-label={cover.img.alt}
            options={{
                // height: FEED_HEIGHT,
                type: 'slide',
                // gap: '1em',
                autoplay: true,
                pauseOnHover: true,
                resetProgress: false,
                perPage: 1,
                arrows: false,
                width: '100%',
            }}
        >
            {items.map(({content, title, thumb, url}, index) => {
                const className = index === 0 ? "line-clamp-6" : "line-clamp-3";

                return (
                    <SplideSlide
                        key={title}
                    >
                        <div>
                            <div>
                                <a href={url} title={title}>
                                    <Image
                                        src={thumb}
                                        alt={title}
                                        style={{height: IMAGE_HEIGHT, width: "auto"}}
                                        className={"center fit"}
                                    />
                                </a>
                            </div>
                            <br/>
                            <div>
                                <h2 className="swiper-slide__title" align={"center"}>
                                    {
                                        !url ? <span className={"line-clamp-3"}>{title}</span> :
                                            <a href={url} title={title}>
                                                <span className={"line-clamp-3"}>{title}</span>
                                            </a>
                                    }

                                </h2>
                                <p className={className} align={"justify"}>{content}</p>
                            </div>
                        </div>
                    </SplideSlide>
                )
            })}
        </Splide>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <WeeklyFeedSwiper/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
