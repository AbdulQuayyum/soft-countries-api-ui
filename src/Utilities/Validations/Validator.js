export default function Validate(values) {
  let errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.name) {
    errors.name = 'Name is required'
  } else if (values.name.length < 1) {
    errors.name = 'Name must be 1 or more characters'
  }
  if (!values.category) {
    errors.category = 'category is required'
  }
  if (!values.message) {
    errors.message = 'Message is required'
  } else if (values.message.length < 1) {
    errors.message = 'Message must be 1 or more characters'
  }
  return errors
}