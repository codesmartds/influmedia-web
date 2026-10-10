import * as migration_20261006_160748_initial from './20261006_160748_initial';
import * as migration_20261008_170954_case_studies_excerpt from './20261008_170954_case_studies_excerpt';
import * as migration_20261008_181542_posts_topic from './20261008_181542_posts_topic';
import * as migration_20261008_182829_gallery_moments from './20261008_182829_gallery_moments';
import * as migration_20261008_183851_gallery_moments_collection from './20261008_183851_gallery_moments_collection';
import * as migration_20261008_183909_drop_gallery_global from './20261008_183909_drop_gallery_global';
import * as migration_20261010_005703_talents_featured from './20261010_005703_talents_featured';

export const migrations = [
  {
    up: migration_20261006_160748_initial.up,
    down: migration_20261006_160748_initial.down,
    name: '20261006_160748_initial',
  },
  {
    up: migration_20261008_170954_case_studies_excerpt.up,
    down: migration_20261008_170954_case_studies_excerpt.down,
    name: '20261008_170954_case_studies_excerpt',
  },
  {
    up: migration_20261008_181542_posts_topic.up,
    down: migration_20261008_181542_posts_topic.down,
    name: '20261008_181542_posts_topic',
  },
  {
    up: migration_20261008_182829_gallery_moments.up,
    down: migration_20261008_182829_gallery_moments.down,
    name: '20261008_182829_gallery_moments',
  },
  {
    up: migration_20261008_183851_gallery_moments_collection.up,
    down: migration_20261008_183851_gallery_moments_collection.down,
    name: '20261008_183851_gallery_moments_collection',
  },
  {
    up: migration_20261008_183909_drop_gallery_global.up,
    down: migration_20261008_183909_drop_gallery_global.down,
    name: '20261008_183909_drop_gallery_global',
  },
  {
    up: migration_20261010_005703_talents_featured.up,
    down: migration_20261010_005703_talents_featured.down,
    name: '20261010_005703_talents_featured'
  },
];
