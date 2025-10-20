type FormInputProps = {
    label: string;
    type: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

type TextAreaProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
};

type FormCheckboxProps = {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormInput({ label, type, name, value, onChange, placeholder }: FormInputProps) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="mb-2 font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#44a694]"
            />
        </div>
    );
}

export function TextArea({ label, name, value, onChange, placeholder, rows = 4 }: TextAreaProps) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="mb-2 font-medium text-gray-700">{label}</label>
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#44a694]"
            />
        </div>
    );
}

export function FormCheckbox({ label, name, checked, onChange }: FormCheckboxProps) {
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            <label htmlFor={name} className="font-medium text-gray-700">{label}</label>
        </div>
    );
}

const Forms = { FormInput, TextArea, FormCheckbox };
export default Forms;