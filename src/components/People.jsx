import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Cards } from './templates/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PageLayout } from './templates/PageLayout';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const People = () => {
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = 'THE BIG SHOW · People';

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setpage((p) => p + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (person.length === 0 && hasMore) GetPerson();
  }, [person, hasMore]);

  return (
    <PageLayout title="People" subtitle="popular personalities" icon={Users}>
      {person.length === 0 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={person.length}
          next={GetPerson}
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
          <Cards data={person} title="person" />
        </InfiniteScroll>
      )}
    </PageLayout>
  );
};
