import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'pdatabase-primary.cl4oyssk8t4r.ap-southeast-1.rds.amazonaws.com',
  port: 5432,
  username: 'moichoigame2',
  password: 'moichoigame2',
  database: 'moichoigame2',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
