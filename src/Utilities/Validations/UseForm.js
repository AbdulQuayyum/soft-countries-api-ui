import { useState, useEffect } from 'react'

const UseForm = (callback, validate) => {

  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors])

  const HandleSubmit = (event) => {
    if (event) event.preventDefault()
    setErrors(validate(values))
    setIsSubmitting(true)
  }

  const HandleChange = (event) => {
    if (event.target) {
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    } else {
      setValues(values => ({ ...values, category: event.category }));
    }

  }

  return {
    HandleChange,
    HandleSubmit,
    values,
    errors,
  }
}

export default UseForm