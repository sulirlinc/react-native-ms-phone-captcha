import React from 'react';
import { Image as ImageComponent } from 'react-native';

/**
 * 图片组件，如果加载图片失败，将显示设置的默认图
 */
export default class Image extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isError: true,
      source: null,
      uri: null,
    };
  }

  static getDerivedStateFromProps({ source }, state) {
    if (source !== state.source) {
      let isError = false;
      let uri;
      if (typeof source === 'object' && Reflect.has(source, 'uri')) {
        uri = source.uri;
        isError = !uri || (uri === state.uri && state.isError);
      }
      return {
        isError,
        source,
        uri,
      };
    }
    return null;
  }

  onError = error => {
    this.setState({ isError: true });
    this.props.onError?.(error);
  };

  render() {
    const { isError, source } = this.state;
    const { defaultSource } = this.props;
    return (
      <ImageComponent
        {...this.props}
        onError={this.onError}
        source={isError ? defaultSource || undefined : source}
      />
    );
  }
}
