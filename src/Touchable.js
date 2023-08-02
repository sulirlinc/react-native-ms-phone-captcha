import React from 'react';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { L } from 'lc-simple-js-common';

/**
 * withoutFeedback 无触摸反馈
 * 本组件用于封装视图，使其可以正确响应触摸操作
 * 在Android设备上，这个组件利用原生状态来渲染触摸的反馈，目前它只支持一个单独的View实例作为子节点
 * 在iOS设备上，当按下的时候，封装的视图的不透明度会降低
 */
class Touchable extends React.Component {
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.keyBoardIsShow = true;
  };

  _keyboardDidHide = () => {
    this.keyBoardIsShow = false;
  };

  _onPress = pressEvent => {
    if (this.keyBoardIsShow && !this.props.notHideKeyboard) {
      Keyboard.dismiss();
    }
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      onPress(pressEvent);
    }
  };

  onPress = pressEvent => {
    const { disableDebounce } = this.props;
    if (disableDebounce) {
      this._onPress(pressEvent);
    } else {
      L.useDebounce(this, this._onPress, { param: pressEvent });
    }
  };

  render() {
    const { children, withoutFeedback, forwardRef, ...rest } = this.props;
    return (
      <>
        {withoutFeedback ? (
          <TouchableWithoutFeedback ref={forwardRef} {...rest} onPress={this.onPress}>
            {children}
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity ref={forwardRef} {...rest} onPress={this.onPress}>
            {children}
          </TouchableOpacity>
        )}
      </>
    );
  }
}
React.forwardRef((props, ref) => <Touchable forwardRef={ref} {...props} />);
