import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect"; // MultiSelect bileşenini ekleyin
import { SelectItemOptionsType } from "primereact/selectitem";
import { ChangeEventHandler } from "react";
import { Controller } from "react-hook-form";

type FormFieldType = {
  control: any;
  name: string;
  label: string;
  required?: string;
  type: "dropdown" | "text" | "number" | "multiselect"; // "multiselect" seçeneğini ekleyin
  options?: SelectItemOptionsType | undefined;
  disabled?: boolean;
  onchange?: MultiSelectChangeEvent;
};

export const FormField = ({
  control,
  required,
  type,
  name,
  label,
  options,
  disabled = false,
  onchange,
}: FormFieldType) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <div className="field col-12">
            <FloatLabel>
              {type === "text" ? (
                <InputText
                  onBlur={onBlur}
                  disabled={disabled}
                  onChange={onChange}
                  value={value}
                  {...(error && {
                    tooltip: error.message,
                    tooltipOptions: {
                      position: "top",
                      className: "p-error",
                    },
                  })}
                  className={error ? "p-invalid" : ""}
                />
              ) : type === "number" ? (
                <InputNumber
                  onBlur={onBlur}
                  disabled={disabled}
                  onChange={(e) => {
                    onChange(e.value);
                    console.log(e.value);
                  }}
                  value={value}
                  id={name}
                  {...(error && {
                    tooltip: error.message,
                    tooltipOptions: {
                      position: "top",
                      className: "p-error",
                    },
                  })}
                  className={error ? "p-invalid" : ""}
                />
              ) : type === "multiselect" ? (
                <MultiSelect
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  disabled={disabled}
                  {...(error && {
                    tooltip: error.message,
                    tooltipOptions: {
                      position: "top",
                      className: "p-error",
                    },
                  })}
                  className={error ? "p-invalid" : ""}
                  optionLabel="label"
                  options={options}
                />
              ) : (
                <Dropdown
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  disabled={disabled}
                  {...(error && {
                    tooltip: error.message,
                    tooltipOptions: {
                      position: "top",
                      className: "p-error",
                    },
                  })}
                  className={error ? "p-invalid" : ""}
                  checkmark={true}
                  highlightOnSelect={false}
                  optionLabel="label"
                  options={options}
                />
              )}
              <label htmlFor={name}>{label}</label>
            </FloatLabel>
          </div>
        )}
        name={name}
      />
    </>
  );
};
