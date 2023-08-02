import React from 'react';
import { View } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
/**
 *  Icon组件，直接使用了react-native-vector-icons组件
 *  因react-native-elements里面引用的react-native-vector-icons版本较低，部分icon不支持
 *  属性：
 *  type - 类型，必填，和react-native-elements里面的类型一致
 *         可用类型：
 *         'zocial' 'octicon' 'material' 'material-community' 'ionicon'
 *         'foundation' 'evilicon' 'entypo' 'font-awesome' 'simple-line-icon'
 *         'feather' 'antdesign'
 *  其它属性参考react-native-vector-icons
 */
export default class Icon extends React.PureComponent {
  render() {
    const { style, ...attr } = this.props;
    if (style) {
      return (
        <View style={style}>
          <AntIcon {...attr} />
        </View>
      );
    }
    return <AntIcon {...attr} />;
  }
}
