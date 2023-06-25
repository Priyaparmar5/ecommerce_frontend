import React from "react";

function InputField({ label, name, type, value, onChange, register, error , options }) {
  return (
    <div>
       <label className="form-label" htmlFor={name}>
        {label}
      </label>
      {type === "radio" ? (
        <div >
          <input
            type={type}
            name={name}
            value={value}
            {...register(name)}
            onChange={onChange}
          />
        
        </div>
      ) :type === "select" ? (
        <select
          name={name}
          className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
          value={value}
          {...register(name)}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) 
     : (
        <input
          type={type}
          name={name}
          className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
          value={value}
          {...register(name)}
          onChange={onChange}
        />
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputField;
