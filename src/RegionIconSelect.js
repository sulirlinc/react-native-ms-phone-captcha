import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Touchable from "./Touchable";
import Image from "./Image";
import Icon from "./Icon";
import cn from './res/flag/cn.jpg'
export default class RegionIconSelect extends PureComponent {
  onRegionCode = item => {
    this.props.onChangeRegion(item);
  };

  render() {

    const { region, paddingLeft } = this.props;
    return (
        <View style={ [ styles.leftViewContainer, { paddingLeft: paddingLeft || 0 } ] }>
          <Touchable onPress={ this.onRegionCode } style={ [ styles.leftViewMain ] }>
            <Image
                style={ {
                  width: 30,
                  height: 20,
                  marginRight: 10,
                } }
                source={ (region && region.icon) || cn }
            />
            <Icon type="antdesign" name="caretdown" color={ styles.themeStyle.primaryColor }
                  size={ 10 }/>
          </Touchable>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  leftViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
  },
  leftViewMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
  }, themeStyle: {
    primaryColor: "#01987B",
    minorFontColor: "#9BA7B2"
  }
});
