type ButtonsProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
};

export function PrimaryButton({ children, onClick, disabled, loading, fullWidth, type="button" }: ButtonsProps) {
    return (
        <button
            onClick={(disabled || loading) ? undefined : onClick}
            disabled={disabled || loading}
            type={type}
            className={`cursor-pointer bg-[#44a694] text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#367f6b] ${(loading || disabled) ? " opacity-50 cursor-not-allowed " : ""} ${fullWidth ? " w-full " : ""}`}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, onClick, disabled, loading, fullWidth, type="button" }: ButtonsProps) {
    return (
        <button
            onClick={(disabled || loading) ? undefined : onClick}
            disabled={disabled || loading}
            type={type}
            className={`cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-300 ${loading ? " opacity-50 cursor-not-allowed " : ""} ${fullWidth ? " w-full " : ""}`}
        >
            {children}
        </button>
    );
}

const Buttons = { PrimaryButton, SecondaryButton };
export default Buttons;