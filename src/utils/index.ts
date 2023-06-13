import { PermissionsAndroid, Platform } from 'react-native';

const isAndroidMarshmallowOrNewer =
  Platform.OS === 'android' && Platform.Version >= 23;

export const checkCameraPermissions = async () => {
  if (isAndroidMarshmallowOrNewer) {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  } else {
    return true;
  }
};

export const requestCameraPermissions = async () => {
  if (isAndroidMarshmallowOrNewer) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android Camera Permission has been granted.');
        return Promise.resolve();
      } else {
        console.log('Android Camera Permission has been denied.');
        return Promise.reject();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  } else {
    return Promise.resolve();
  }
};

export const requestCameraPermissionsIfNeeded = async () => {
  const hasPermissions = await checkCameraPermissions();
  if (!hasPermissions) {
    return requestCameraPermissions();
  } else {
    return Promise.resolve();
  }
};

export const scanDitLicenseKey = `AdUjiR5WPf/NJN3kkDyPzyI/AtdVI/XfalLWQLFN0YTQbP93giiJcZlhyaddcs0JfQPotPo0CItdDBGwSWrumLIArYqFWWKCQwhaG90vP9nyemk050y2x+t9BiHeTmzwOHYUWUdPLMkebSTO5FGXWW00FKigDOAKKi4q1fwCHMxFHnFYxkzkbs+DcSIDaDhF3Pf1pHQuDROr1yIQgMcZG4rBSig3G4kQWS8Ub2rEJCEmjJ8lPptt3qDFBcAp9EpibKcQy9FXTNowrvxgxZ9sRGQNH9pzdI8/CuNDiNuTObRW68q+Wcss3Zthic8sKIP+2CsVyuFbFHq4IQY0JrNn9Gi9us5EnsxH33sfkVHjXEd1Zcxb03KprhyhEKWufWcCHAlJC2oz+44ABRV0rtZp2cQVgcP8nknW6sziCKxOcK7ZVvgP+Qn7qfjH/OkvcTQrb9iG8b8QT5cRtWprOjx08GVEnjusW3LLasmhwiivQFLeZsugcqpl2yuTZUiTscvhuj/UEOvbgE641FbkBuh6KPUTBCnLRde7Wy1QYGK7Xs0zwUg4727OjSsf169Q3hNfj1q0QwXUIvntwHyP/YFmytPAwYTQ/dTfUDMIDQBN85DYPHxpFjIG5ESvKufn8LPYZzeQOfZKEbUnKnmIQSuI3SZYl3hBJqAHDkTEPKs8ZMek0mdwSGVlhds5rFTmH2xydq4wbGH1l3WYg06HCQeOwHEkYtNw6ZZQHoEQvMpeAr596mQ4T6Liy5QIub/7AvlBHghaS8L/GTADkMdpvgCEZMQWNjt2tltAf0fsSypa5pB79Znljszvn2ly2rOGedbMO5MAL+8Hmp7mg94rGnBx4fM=`;
