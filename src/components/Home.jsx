import React, { useEffect, useState } from 'react';
import { Sidenav } from './templates/Sidenav';
import { Topnav } from './templates/Topnav';
import axios from '../utils/axios';
import { Header } from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
import Loading from './Loading';
import { Dropdown } from './templates/Dropdown';
import { motion } from 'framer-motion';
import { TrendingUp, Flame } from 'lucide-react';

export const Home = () => {
  document.title = 'THE BIG SHOW · Home';
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrendin] = useState(null);
  const [menuset, setmenuset] = useState(false);
  const [category, setcategory] = useState('all');

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get('/trending/all/day');
      const randomdata = data.results[Math.floor(Math.random() * data.results.length)];
      setwallpaper(randomdata);
    } catch (error) {
      console.log('error', error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrendin(data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  function menuhendlaer() {
    setmenuset(!menuset);
  }

  useEffect(() => {
    GetTrending();
    if (!wallpaper) GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex w-full min-h-screen bg-surface-base">
      <Sidenav menuset={menuset} />

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {/* Top nav */}
        <div className="flex items-center border-b border-surface-border bg-surface-base/80 backdrop-blur-md sticky top-0 z-30">
          <Topnav menuhendlaer={menuhendlaer} menuset={menuset} />
        </div>

        {/* Hero */}
        <Header data={wallpaper} />

        {/* Trending section */}
        <motion.section
          className="px-5 pt-8 pb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h2 className="section-title">Trending Today</h2>
                <p className="section-subtitle text-xs mt-0.5">What everyone is watching right now</p>
              </div>
            </div>
            <Dropdown
              title="Filter"
              options={['tv', 'movie', 'all']}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <HorizontalCards data={trending} />
        </motion.section>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
