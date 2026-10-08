import * as migration_20261006_160748_initial from './20261006_160748_initial';
import * as migration_20261008_170954_case_studies_excerpt from './20261008_170954_case_studies_excerpt';

export const migrations = [
  {
    up: migration_20261006_160748_initial.up,
    down: migration_20261006_160748_initial.down,
    name: '20261006_160748_initial',
  },
  {
    up: migration_20261008_170954_case_studies_excerpt.up,
    down: migration_20261008_170954_case_studies_excerpt.down,
    name: '20261008_170954_case_studies_excerpt'
  },
];
