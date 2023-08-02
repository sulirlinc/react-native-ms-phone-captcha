
export function formatOnlyPhone(codePhone) {
  if (!codePhone) {
    return '';
  }
  if (codePhone.indexOf('-') === -1) {
    return codePhone;
  }
  const [code, phone] = codePhone.split('-');
  return `${phone}`;
};
export function validatePhone(phone, region) {
  if (!phone || !phone.trim()) {
    throw "phone.is.null";
    return "";
  }
  phone = formatOnlyPhone(phone.trim());
  if (region && region.pattern && !region.pattern.test(phone)) {
    throw "first.phone.character.must.not.be.0";
    return "";
  }
  return phone;
}
export function handlePhone(phone, input, region) {
  if (!input) {
    return phone;
  }
  if (!phone) {
    input.setNativeProps({ text: "" });
    return "";
  }
  phone = phone.replace(/[^\d]/g, "");
  if (region && phone.startsWith("0")) {
    phone = phone.substring(1);
    return handlePhone(phone, input, region);
  }
  input.setNativeProps({ text: phone });
  return phone;
}