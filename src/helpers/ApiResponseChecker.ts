const CheckLoginApiResponse = (data: string | null) => {
  if (data == null) {
    return false;
  } else {
    return true;
  }
};
export {CheckLoginApiResponse};
