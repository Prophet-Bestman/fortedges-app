export const validateProfile = (builder, data, values, setError) => {
  setError("");

  if (values.display_name !== data.display_name) {
    if (!values.display_name) {
      return setError("Display name is required");
    }
    builder.display_name = values.display_name;
  }

  if (values.email !== data.email) {
    if (!values.email) {
      return setError("Email is empty");
    }
    builder.email = values.email;
  }

  if (Object.keys(builder).length === 0) {
    return setError("No changes to update");
  }
  return builder;
};

export const validatePersonalInfo = (builder, data, values, setError) => {
  setError("");

  if (values.dob !== data.dob) {
    if (!values.dob) {
      return setError("Date of birth cannot be empty");
    }
    builder.dob = values.dob.slice(0, 10);
  }

  if (values.state !== data?.address?.state) {
    if (!values.state) {
      return setError("State cannot be empty");
    }
    builder.address.state = values.state;
  }

  if (values.city !== data?.address?.city) {
    if (!values.city) {
      return setError("City cannot be empty");
    }
    builder.address.city = values.city;
  }

  if (values.country !== data?.address?.country) {
    if (!values.country) {
      return setError("Country cannot be empty");
    }
    builder.address.country = values.country;
  }

  if (Object.keys(builder).length === 0) {
    return setError("No changes to update");
  }
  return builder;
};
