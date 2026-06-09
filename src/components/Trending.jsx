import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Cards } from './templates/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dropdown } from './templates/Dropdown';
import { PageLayout } from './templates/PageLayout';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Trending = () => {
  const [category, setcategory] = useState('movie');
  const [duration, setduration] = useState('day');
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `THE BIG SHOW · Trending ${category.toUpperCase()}`;

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage((p) => p + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const refershHandler = () => {
    setpage(1);
    settrending([]);
    sethasMore(true);
  };

  useEffect(() => {
    refershHandler();
  }, [category, duration]);

  useEffect(() => {
    if (trending.length === 0 && hasMore) GetTrending();
  }, [trending, hasMore]);

  return (
    <PageLayout
      title="Trending"
      subtitle={`${category} · ${duration}`}
      icon={TrendingUp}
      controls={
        <>
          <Dropdown title="Category" options={['movie', 'tv']} func={(e) => setcategory(e.target.value)} />
          <Dropdown title="Duration" options={['day', 'week']} func={(e) => setduration(e.target.value)} />
        </>
      }
    >
      {trending.length === 0 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={
            <div className="py-4 flex justify-center">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-sm text-content-tertiary"
              >
                Loading more…
              </motion.div>
            </div>
          }
          endMessage={
            <p className="text-center py-6 text-sm text-content-disabled">
              You've seen it all!
            </p>
          }
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      )}
    </PageLayout>
  );
};
