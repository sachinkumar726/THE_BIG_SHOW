import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Cards } from './templates/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dropdown } from './templates/Dropdown';
import { PageLayout } from './templates/PageLayout';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Popular = () => {
  const [category, setcategory] = useState('movie');
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `THE BIG SHOW · Popular ${category.toUpperCase()}`;

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
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
    setpopular([]);
    sethasMore(true);
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  useEffect(() => {
    if (popular.length === 0 && hasMore) GetPopular();
  }, [popular, hasMore]);

  return (
    <PageLayout
      title="Popular"
      subtitle={category}
      icon={Star}
      controls={
        <Dropdown title="Category" options={['movie', 'tv']} func={(e) => setcategory(e.target.value)} />
      }
    >
      {popular.length === 0 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={popular.length}
          next={GetPopular}
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
          <Cards data={popular} title={category} />
        </InfiniteScroll>
      )}
    </PageLayout>
  );
};
