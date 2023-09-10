const webpush = require("web-push")

const publicVapidKey = 'BHL15oqdTo-WZiRFX6tjEiYqlGXt539eCpM6OWRrhfZUWsr0xJAwDpJ3R2IgtMoN_ck6lQFi_GyLiBhmdZfbi2I';
const privateVapidKey = 'yQrM2II6X8LZRWEl_tSJu_H4oJQUVJniRgejLhbmz5I';

const initWebPush  = (): void  => {
  webpush.setVapidDetails(
    'mailto:manu.mandalreddy@gmail.com',
    publicVapidKey,
    privateVapidKey,
  );
};


module.exports = { initWebPush }