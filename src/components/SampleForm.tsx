import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormValues = {
  phoneNumber: string;
  confirmPhoneNumber: string;
  firstRadio: string;
  secondRadio: string;
  firstCheckboxes: string[];
  secondCheckboxes: string[];
};

const phonePattern = /^\([2-9]\d{2}\)-\d{3}-\d{4}$/;

const SampleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      secondCheckboxes: ['HTML', 'Javascript'],
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data, null, 2))
  };

  const phoneNumber = watch('phoneNumber');
  const firstRadio = watch('firstRadio');
  const secondRadio = watch('secondRadio');

  useEffect(()=> {
    if(firstRadio === 'no') {
       setValue('firstCheckboxes', [])
    }
    if(secondRadio === 'no') {
      setValue('secondCheckboxes', [])
    }

  }, [firstRadio, secondRadio])

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Phone Number Form">
      <h2>Sample Form</h2>
     
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="text"
          placeholder="(###)-###-####"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: phonePattern,
              message: 'Format must be (###)-###-####  and start with 2-9',
            },
          })}
          aria-invalid={errors.phoneNumber ? 'true' : 'false'}
          aria-describedby="phoneNumberError"
        />
        {errors.phoneNumber && (
          <span className="error" role="alert" id="phoneNumberError">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPhoneNumber">Confirm Phone Number</label>
        <input
          id="confirmPhoneNumber"
          type="text"
          placeholder="(###)-###-####"
          {...register('confirmPhoneNumber', {
            required: 'Please confirm your phone number',
            pattern: {
              value: phonePattern,
              message: 'Format must be (###)-###-#### and start with 2-9',
            },
            validate: (value) =>
              value === phoneNumber || 'Phone numbers do not match',
          })}
          aria-invalid={errors.confirmPhoneNumber ? 'true' : 'false'}
          aria-describedby="confirmPhoneNumberError"
        />
        {errors.confirmPhoneNumber && (
          <span className="error" role="alert" id="confirmPhoneNumberError">
            {errors.confirmPhoneNumber.message}
          </span>
        )}
      </div>

      <div className='form-group'>
      <h4>Do you have Knowledge on Web Technologies ?</h4>
      <label className='radio-label'>
        <input
          type="radio"
          value="yes"
          {...register('firstRadio', { required: 'This field is required' })}
           aria-invalid={errors.firstRadio ? 'true' : 'false'}
          aria-describedby="firstRadioError"
        />
        Yes
      </label>
      <label className='radio-label'>
        <input
          type="radio"
          value="no"
          {...register('firstRadio', { required: 'This field is required' })}
          aria-invalid={errors.firstRadio ? 'true' : 'false'}
          aria-describedby="firstRadioError"

        />
        No
      </label>
      {errors.firstRadio && <span className="error" role="alert" id="firstRadioError">
            {errors.firstRadio.message}
          </span>}
      </div>

      {firstRadio === 'yes' && (
        <div className="checkbox-group">
           <p>If yes select at least one option:</p>
          {['HTML', 'Css', 'Bootstrap', 'Javascript'].map((opt) => (
            <label key={opt}>
              <input
                type="checkbox"
                value={opt}
                {...register('firstCheckboxes', {
                  validate: (value) =>
                    value.length > 0 || 'Select at least one checkbox',
                })}
                 aria-invalid={errors.firstCheckboxes ? 'true' : 'false'}
                 aria-describedby="firstCheckboxesError"
              />
              {opt}
            </label>
          ))}
          {errors.firstCheckboxes && (
            <span className="error" role="alert" id="firstCheckboxesError">
            {errors.firstCheckboxes.message}
          </span>
          )}
        </div>
      )}

      <div className='form-group'>
        <h4>Do you have Knowledge on Web Technologies ?</h4>
      <label className='radio-label'>
        <input
          type="radio"
          value="yes"
          {...register('secondRadio', { required: 'This field is required' })}
           aria-invalid={errors.secondRadio ? 'true' : 'false'}
          aria-describedby="secondRadioError"
        />
        Yes
      </label>
      <label className='radio-label'>
        <input
          type="radio"
          value="no"
          {...register('secondRadio', { required: 'This field is required' })}
           aria-invalid={errors.secondRadio ? 'true' : 'false'}
          aria-describedby="secondRadioError"

        />
        No
      </label>
      {errors.secondRadio && <span className="error" role="alert" id="secondRadioError">
            {errors.secondRadio.message}
          </span>}

      </div>

      {secondRadio === 'yes' && (
        <div className="checkbox-group">
          <p>If yes select at least one option:</p>
          {['HTML', 'Css', 'Bootstrap', 'Javascript'].map((opt) => (
            <label key={opt}>
              <input
                type="checkbox"
                value={opt}
                {...register('secondCheckboxes', {
                  validate: (value) =>
                    value.length > 0 || 'Select at least one checkbox',
                })}
                 aria-invalid={errors.secondCheckboxes ? 'true' : 'false'}
                 aria-describedby="secondCheckboxesError"
              />
              {opt}
            </label>
          ))}
            {errors.secondCheckboxes && (
            <span className="error" role="alert" id="secondCheckboxesError">
            {errors.secondCheckboxes.message}
          </span>
          )}
        </div>
      )}

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default SampleForm;
