import React from "react";

type Props = {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: React.EventHandler<React.SyntheticEvent>;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: React.EventHandler<React.SyntheticEvent>;
};

function FormField({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="text-sm font-semibold text-gray-800">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button type="button" onClick={handleSurpriseMe} className="font-semibold text-xs bg-[#d8d8dd] py-1 px-2 rounded-[4px] text-black">
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        className="block w-full border p-3 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#6469ff] outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default FormField;
