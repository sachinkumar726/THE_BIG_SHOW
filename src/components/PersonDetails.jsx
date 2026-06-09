import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadperson, removeperson } from './store/actions/personActions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from './templates/HorizontalCards';
import { Dropdown } from './templates/Dropdown';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Home, Globe,
  User, Cake, MapPin, Clapperboard, Calendar, BookOpen,
} from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value }) => {
  if (!value || value === 'N/A' || value === 'null' || value === null) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-content-tertiary" />
      </div>
      <div>
        <p className="text-2xs font-semibold text-content-disabled uppercase tracking-wider">{label}</p>
        <p className="text-sm text-content-secondary mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [Category, setCategory] = useState('movie');

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => { dispatch(removeperson()); };
  }, [id]);

  if (!info) return <Loading />;

  const { detail, externalid, combinedCredits, movieCredits, tvCredits } = info;

  return (
    <div className="min-h-screen bg-surface-base text-content-primary">
      {/* Nav */}
      <nav className="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 bg-surface-base/90 backdrop-blur-md border-b border-surface-border">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-icon btn-ghost"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-sm text-content-primary">{detail.name}</span>
        <Link to="/" className="ml-auto btn btn-icon btn-ghost" aria-label="Home">
          <Home className="w-4 h-4" />
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 sm:px-4 py-8">
        <div className="flex gap-8 sm:flex-col">
          {/* Left — profile + info */}
          <motion.aside
            className="w-64 sm:w-full shrink-0"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Profile picture */}
            <div className="rounded-2xl overflow-hidden shadow-card-lg border border-surface-border mb-5 aspect-[2/3]">
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/w342/${detail.profile_path}`}
                alt={detail.name}
              />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mb-5">
              {externalid.wikidata_id && (
                <Link target="_blank" rel="noopener noreferrer" to={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`} className="btn btn-icon btn-ghost" title="Wikipedia">
                  <Globe className="w-4 h-4" />
                </Link>
              )}
              {externalid.facebook_id && (
                <Link target="_blank" rel="noopener noreferrer" to={`https://www.facebook.com/${externalid.facebook_id}`} className="btn btn-icon btn-ghost text-blue-400" title="Facebook">
                  <Globe className="w-4 h-4" />
                </Link>
              )}
              {externalid.instagram_id && (
                <Link target="_blank" rel="noopener noreferrer" to={`https://www.instagram.com/${externalid.instagram_id}`} className="btn btn-icon btn-ghost text-pink-400" title="Instagram">
                  <i className="ri-instagram-fill text-base" />
                </Link>
              )}
              {externalid.twitter_id && (
                <Link target="_blank" rel="noopener noreferrer" to={`https://twitter.com/${externalid.twitter_id}`} className="btn btn-icon btn-ghost text-sky-400" title="Twitter / X">
                  <i className="ri-twitter-x-fill text-base" />
                </Link>
              )}
            </div>

            {/* Personal info */}
            <div className="card p-4 space-y-4">
              <h3 className="text-xs font-bold text-content-disabled uppercase tracking-widest">
                Personal Info
              </h3>
              <InfoRow icon={Clapperboard} label="Known For"     value={detail.known_for_department} />
              <InfoRow icon={User}         label="Gender"        value={detail.gender === 2 ? 'Male' : detail.gender === 1 ? 'Female' : 'Other'} />
              <InfoRow icon={Cake}         label="Birthday"      value={detail.birthday} />
              <InfoRow icon={Calendar}     label="Day of Death"  value={detail.deathday ?? 'Still Alive'} />
              <InfoRow icon={MapPin}       label="Place of Birth" value={detail.place_of_birth} />
              {detail.also_known_as?.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-content-tertiary" />
                  </div>
                  <div>
                    <p className="text-2xs font-semibold text-content-disabled uppercase tracking-wider">Also Known As</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {detail.also_known_as.map((aka, i) => (
                        <span key={i} className="badge bg-surface-muted text-content-tertiary border-surface-border text-2xs">
                          {aka}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>

          {/* Right — biography + credits */}
          <motion.main
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-3xl font-black text-white mb-6 tracking-tight">
              {detail.name}
            </h1>

            {/* Biography */}
            {detail.biography && (
              <section className="mb-8">
                <h2 className="flex items-center gap-2 section-title mb-3">
                  <BookOpen className="w-4 h-4 text-brand-400" />
                  Biography
                </h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  {detail.biography}
                </p>
              </section>
            )}

            {/* Known for — horizontal scroll */}
            {combinedCredits?.cast?.length > 0 && (
              <section className="mb-8">
                <h2 className="section-title mb-3">Known For</h2>
                <HorizontalCards data={combinedCredits.cast.slice(0, 20)} />
              </section>
            )}

            {/* Filmography list */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">Filmography</h2>
                <Dropdown
                  title="Category"
                  options={['movie', 'tv']}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="card divide-y divide-surface-border max-h-[60vh] overflow-y-auto">
                {info[Category + 'Credits']?.cast?.length > 0 ? (
                  info[Category + 'Credits'].cast.map((c, i) => (
                    <Link
                      key={i}
                      to={`/${Category}/details/${c.id}`}
                      className="flex items-start gap-4 p-4 hover:bg-surface-muted transition-colors duration-150 group"
                    >
                      <div className="shrink-0 text-xs text-content-disabled w-16 pt-0.5 text-right">
                        {(c.release_date || c.first_air_date || '').split('-')[0] || '—'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-content-secondary group-hover:text-content-primary transition-colors">
                          {c.original_title || c.name || c.title || c.original_name}
                        </p>
                        {c.character && (
                          <p className="text-xs text-content-tertiary mt-0.5">
                            as <span className="italic">{c.character}</span>
                          </p>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-content-tertiary">
                    No {Category} credits found.
                  </div>
                )}
              </div>
            </section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};
