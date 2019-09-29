import React, {Component} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~services/api';
import * as S from './styles';

class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  componentDidMount = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

    this.setState({users});
  };

  componentDidUpdate = (_, prevState) => {
    const {users} = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  };

  handleAddUser = async () => {
    this.setState({loading: true});
    const {users, newUser} = this.state;

    const res = await api.get(`/users/${newUser}`);

    const {name, login, bio, avatar_url} = res.data;
    const data = {name, login, bio, avatar_url};

    this.setState({users: [...users, data], newUser: ''});

    Keyboard.dismiss();
    this.setState({loading: false});
  };

  handleShowProfile = userData => {
    const {navigation} = this.props;

    navigation.navigate('User', {userData});
  };

  render() {
    const {users, newUser, loading} = this.state;

    return (
      <S.Container>
        <S.Form>
          <S.Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={newUser => this.setState({newUser})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <S.SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </S.SubmitButton>
        </S.Form>

        <S.List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({item}) => (
            <S.User>
              <S.Avatar source={{uri: item.avatar_url}} />
              <S.Name>{item.name}</S.Name>
              <S.Bio>{item.bio}</S.Bio>
              <S.ProfileButton onPress={() => this.handleShowProfile(item)}>
                <S.ProfileButtonText>Ver perfil</S.ProfileButtonText>
              </S.ProfileButton>
            </S.User>
          )}
        />
      </S.Container>
    );
  }
}

export default Main;
