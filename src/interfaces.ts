export interface IInputProps {
  label: string;
  name: string;
  id: string;
  icon?: string;
  placeholder: string;
  inputMode: "decimal" | "numeric";
  visibility: {
    label: boolean;
    error: boolean;
  };
  validator: (value: string) => string | null;
}

export interface IOption {
  value: string;
  label: string;
}
