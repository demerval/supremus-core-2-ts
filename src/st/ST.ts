import STQuery from './auxx/STQuery';
import STQueryBuilder from './auxx/STQueryBuilder';

export default () => {
  function select(nomeModel: string): STQuery {
    const query = new STQuery();
    return query.model(nomeModel);
  }

  function teste(query: STQuery): string {
    const config = query.config;
    const configJoin = query.configJoin;
    return new STQueryBuilder(config, configJoin).getSql();
  }

  return {
    select,
    teste,
  };
};
