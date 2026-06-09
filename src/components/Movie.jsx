import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Cards } from './templates/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dropdown } from './templates/Dropdown';
import { PageLayout } from './templates/PageLayout';
import { Film } from 'lucide-react';
import { motion } from 'framer-motion';

export const Movie = () => {
  const [category, setcategory] = useState('now_playing');
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `THE BIG SHOW · Movies · ${category.replace(/_/g, ' ').toUpperCase()}`;

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
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
    setmovie([]);
    sethasMore(true);
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  useEffect(() => {
    if (movie.length === 0 && hasMore) GetMovie();
  }, [movie, hasMore]);

  return (
    <PageLayout
      title="Movies"
      subtitle={category.replace(/_/g, ' ')}
      icon={Film}
      controls={
        <Dropdown
          title="Category"
          options={['now_playing', 'popular', 'top_rated', 'upcoming']}
          func={(e) => setcategory(e.target.value)}
        />
      }
    >
      {movie.length === 0 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie}
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
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      )}
    </PageLayout>
  );
};
