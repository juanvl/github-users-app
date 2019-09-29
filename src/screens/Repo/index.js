import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

const Repo = ({ navigation }) => (
  <WebView
    source={{ uri: navigation.getParam('repoUrl') }}
    style={{ flex: 1 }}
  />
);

Repo.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Repo.navigationOptions = {
  title: 'Página do GitHub',
};

export default Repo;
