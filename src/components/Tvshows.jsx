import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Cards } from './templates/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dropdown } from './templates/Dropdown';
import { PageLayout } from './templates/PageLayout';
import { Tv2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Tvshows = () => {
  const [category, setcategory] = useState('popular');
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `THE BIG SHOW · TV Shows · ${category.replace(/_/g, ' ').toUpperCase()}`;

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
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
    settv([]);
    sethasMore(true);
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  useEffect(() => {
    if (tv.length === 0 && hasMore) GetTv();
  }, [tv, hasMore]);

  return (
    <PageLayout
      title="TV Shows"
      subtitle={category.replace(/_/g, ' ')}
      icon={Tv2}
      controls={
        <Dropdown
          title="Category"
          options={['popular', 'top_rated', 'on_the_air', 'airing_today']}
          func={(e) => setcategory(e.target.value)}
        />
      }
    >
      {tv.length === 0 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv}
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
          endMessage={<p className="text-center py-6 text-sm text-content-disabled">You've seen it all!</p>}
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      )}
    </PageLayout>
  );
};
