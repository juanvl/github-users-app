import React, { Component } from 'react';
import { GITHUB_ACCESS_TOKEN } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import api from '~services/api';
import * as S from './styles';

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('userData').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    page: 0,
    refreshing: false,
  };

  componentDidMount = async () => {
    this.loadMore();
  };

  loadMore = async () => {
    const { navigation } = this.props;
    const { stars, page, refreshing } = this.state;
    const user = navigation.getParam('userData');
    const newPage = refreshing ? 1 : page + 1;

    const res = await api.get(
      `/users/${user.login}/starred?page=${newPage}&access_token=${GITHUB_ACCESS_TOKEN}`
    );

    this.setState({
      stars: [...stars, ...res.data],
      page: newPage,
      loading: false,
      refreshing: false,
    });
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.loadMore);
  };

  openStarredRepo = repoUrl => {
    this.props.navigation.navigate('Repo', { repoUrl });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam('userData');

    return (
      <S.Container>
        <S.Header>
          <S.Avatar source={{ uri: user.avatar_url }} />
          <S.Name>{user.name}</S.Name>
          <S.Bio>{user.bio}</S.Bio>
        </S.Header>

        {loading ? (
          <S.Loading size="large" />
        ) : (
          <S.StarsList
            data={stars}
            keyExtractor={star => String(star.id)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            renderItem={({ item }) => (
              <S.Starred onPress={() => this.openStarredRepo(item.html_url)}>
                <S.OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <S.Info>
                  <S.Title>{item.name}</S.Title>
                  <S.Author>{item.owner.login}</S.Author>
                </S.Info>
              </S.Starred>
            )}
          />
        )}
      </S.Container>
    );
  }
}

export default User;
