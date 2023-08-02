import { Component } from "react";
import { StyleSheet, Text, View, } from "react-native";
import { Input } from "react-native-elements";
import RegionIconSelect from "./RegionIconSelect";
import { validatePhone, handlePhone } from "./util";
import Touchable from "./Touchable";

const COUNTDOWN = 70;

export default class MSPhoneCaptcha extends Component {
  constructor(props) {
    super(props);
    const { style } = props;
    this.style = style || styles;
    this.state = {
      showCountDown: false,
      countDown: COUNTDOWN,
      phone: props.phone,
      region: {}
    };
  }

  setPhone = text => {
    this.setState({ phone: text });
  };

  onChangeRegion = item => {
    const phone = handlePhone(this.state.phone, this._input, item);
    this.setState({
      region: item,
      phone,
    });
  };

  renderInput = () => {
    const { region } = this.state;
    const { title: { phoneText = "请输入手机号" } = {} } = this.props;
    return (
        <View style={ [ this.style.inputContainer ] }>
          <Input
              ref={ ref => (this._input = ref) }
              inputContainerStyle={ this.style.loginStyle.commonInputContainer }
              maxLength={ 15 }
              inputStyle={ [ this.style.loginStyle.inputStyle, { paddingLeft: 15 } ] }
              leftIcon={
                <RegionIconSelect
                    region={ region }
                    navigation={ this.props.navigation }
                    paddingLeft={ 0 }
                    onChangeRegion={ this.onChangeRegion }
                />
              }
              leftIconContainerStyle={ { marginLeft: 0 } }
              placeholder={ phoneText }
              placeholderTextColor={ this.style.minorFontColor }
              onChangeText={ this.setPhone }
              selectionColor={ this.style.themeStyle.primaryColor }
              value={ this.state.phone }
              phoneRegion={ region }
              inputType="phone"
          />
        </View>
    );
  };

  onSendCode = () => {
    const { isSend, region } = this.state;
    const { sendCaptcha } = this.props
    if (isSend) return;
    const phone = validatePhone(this.state.phone, region);
    if (!phone) return;
    sendCaptcha(`${ region.code }-${ phone }`)
    this.runTimer();
  };

  runTimer = () => {
    this.setState({ isSend: true });
    this.timer = setInterval(() => {
      const { second } = this.state;
      if (second <= 0) {
        this.setState({ second: this.count, isSend: false });
        clearInterval(this.timer);
      } else {
        this.setState({ second: this.state.second - 1 });
      }
    }, 1000);
  };

  renderRightView = () => {
    const { second, isSend, phone, region } = this.state;
    const {
      title: {
        sendText = "获取验证码"
      } = {}
    } = this.props;
    const checkPhone = !validatePhone(phone, region, false);
    return (
        <Touchable onPress={ this.onSendCode } style={ this.style.mr15 }>
          <Text
              style={ [
                styles.sendCodeTitle,
                { color: checkPhone ? styles.themeStyle.minorFontColor : styles.themeStyle.primaryColor },
              ] }
          >
            { isSend ? `${ second }s` : sendText }
          </Text>
        </Touchable>
    );
  };
  renderPhoneCodeLogin = ({ phoneCodePlaceholder = "请输入验证码" }) => (
      <View style={ [ this.style.inputContainer, this.style.pwdSpace ] }>
        <Input
            inputType="phoneCode"
            inputContainerStyle={ this.style.commonInputContainer }
            inputStyle={ [ this.style.loginStyle.inputStyle, { paddingLeft: 0 } ] }
            placeholder={ phoneCodePlaceholder }
            onChangeText={ text => {
              this.setState({ code: text });
            } }
            rightIcon={ this.renderRightView() }
            placeholderTextColor={ this.style.themeStyle.minorFontColor }
            selectionColor={ this.style.themeStyle.primaryColor }
            defaultValue={ this.state.code }
            returnKeyType="done"
            onSubmitEditing={ this.phoneCodeRegister }
        />
      </View>
  );


  phoneCodeRegister = async () => {
    const { code, region } = this.state;
    const phone = validatePhone(this.state.phone, region);
    if (!phone) return;
  };

  render() {
    const {
      phone,
      sendCodeText = "发送验证码",
      phoneText, phoneCodePlaceholder,
      onChangePhoneOrEmail, titleText, ...rest
    } = this.props;
    return (
        <>
          <View style={ styles.tabBody }>
            <View style={ styles.tabBody }>
              { this.renderInput() }
              <View style={ this.style.separatorLine }/>
              { this.renderPhoneCodeLogin({ phoneCodePlaceholder }) }
              <View style={ this.style.separatorLine }/>
            </View>
          </View>
        </>
    );
  }
}

const styles = StyleSheet.create({
  tabBody: {
    marginTop: 10,
  },

  pwdSpace: {
    marginTop: 10,
    // marginBottom: 12,
  },
  mr15: {
    paddingRight: 15,
  },
  themeStyle: {
    primaryColor: "#01987B",
    minorFontColor: "#9BA7B2"
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 42,
  },
  loginStyle: {
    inputStyle: {
      paddingLeft: 11,
      paddingVertical: 10,
      color: "#333333", // 标题
      fontSize: 16,
    }
  },
  commonInputContainer: {
    borderBottomColor: "transparent",
  },
  inputContainer: {
    height: 48,
    marginTop: 12,
    marginHorizontal: 32,
  },
  sendCodeTitle: {
    fontSize: 14,
    color:  "#01987B",
  },
});
