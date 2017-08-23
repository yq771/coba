import React from 'react';

import {graphql, QueryRenderer} from 'react-relay';

import environment from '../../createRelayEnvironment';
import RepositoryBuildList from '../../components/RepositoryBuildList'
import CirrusLinearProgress from "../../components/CirrusLinearProgress";

const Repository = (props) => (
  <QueryRenderer
    environment={environment}
    variables={props.match.params}
    query={
      graphql`
        query GitHubRepositoryQuery($user: String!, $name: String!) {
          githubRepository(user: $user, name: $name) {
            ...RepositoryBuildList_repository
          }
        }
      `
    }

    render={({error, props}) => {
      if (!props) {
        return <CirrusLinearProgress />
      }
      return <RepositoryBuildList repository={props.githubRepository}/>
    }}
  />
);

export default Repository;