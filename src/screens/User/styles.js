import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.View`
  align-items: center;
  border-bottom-width: 1px;
  border-color: #eee;
  padding-bottom: 20px;
`;

export const Avatar = styled.Image`
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: #eee;
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  text-align: center;
`;

export const StarsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled(RectButton)`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background-color: #eee;
`;

export const Info = styled.View`
  padding: 0 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

export const Loading = styled.ActivityIndicator`
  margin: auto;
`;
