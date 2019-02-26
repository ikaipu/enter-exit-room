export type GlobalState = {
  authStore: Object,
  demoStore: Object,
  requestStore: Object,
};

export type Action = { type: string, payload?: Object };

export type ActionCreator = (params?: any) => Action;

export type ActionDispatcher = Action => Function;

export type RequestObject = {
  sending: boolean,
  error: boolean,
  success: boolean,
  message: string,
};

export type FormProps = {
  // values,
  // errors,
  // touched,
  // handleChange,
  // handleBlur,
  // handleSubmit,
  // isSubmitting
};
